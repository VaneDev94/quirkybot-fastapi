from dotenv import load_dotenv
import openai
import json
import os
from datetime import datetime
from scripts.consultas import consultar_pedido
from wix_api import get_order_details

# Cargar variables de entorno
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

client = openai.OpenAI(api_key=openai_api_key)

def cambiar_direccion(pedido_id, nueva_direccion):
    return f"La dirección del pedido {pedido_id} ha sido actualizada a: {nueva_direccion} ✅"

def cambiar_email(pedido_id, nuevo_email):
    return f"El email del pedido {pedido_id} ha sido cambiado a: {nuevo_email} 📧"

def cancelar_pedido(pedido_id):
    return f"El pedido {pedido_id} ha sido cancelado correctamente ❌"

def consultar_estado_pedido(pedido_id):
    return f"El pedido {pedido_id} está en preparación y será enviado pronto 📦"

def obtener_info_pedido(pedido_id):
    datos = get_order_details(pedido_id)
    if not datos:
        return f"No se pudo obtener información del pedido {pedido_id} ❌"

    estado = datos.get("status", "desconocido")
    total = datos.get("priceSummary", {}).get("total", {}).get("amount", "N/A")
    return f"📦 El pedido {pedido_id} está en estado '{estado}' y el total es {total}€"

def ver_productos_pedido(pedido_id):
    try:
        with open("productos_lara.txt", "r", encoding="utf-8") as f:
            lineas = f.readlines()
        productos = [linea.strip().split("|")[0] for linea in lineas if linea.strip()]
        if not productos:
            return f"No se encontraron productos para el pedido {pedido_id}."
        import random
        seleccion = random.sample(productos, min(2, len(productos)))
        return f"El pedido {pedido_id} contiene: " + " y ".join(seleccion) + " 🕯️"
    except Exception as e:
        return f"Error al leer productos del pedido {pedido_id}: {str(e)}"

def generar_enlace_pago(pedido_id, producto, cantidad):
    link = f"https://quirkyartbylara.com/pago-simulado/{producto.replace(' ', '-').lower()}-{cantidad}"
    return f"Puedes pagar el añadido de {cantidad} x {producto} aquí: {link} 💳"

funciones_openai = [
    {
        "name": "cambiar_direccion",
        "description": "Actualizar la dirección de envío de un pedido",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"},
                "nueva_direccion": {"type": "string"}
            },
            "required": ["pedido_id", "nueva_direccion"]
        }
    },
    {
        "name": "cambiar_email",
        "description": "Actualizar el correo electrónico del pedido",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"},
                "nuevo_email": {"type": "string"}
            },
            "required": ["pedido_id", "nuevo_email"]
        }
    },
    {
        "name": "cancelar_pedido",
        "description": "Cancelar un pedido",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"}
            },
            "required": ["pedido_id"]
        }
    },
    {
        "name": "consultar_estado_pedido",
        "description": "Ver el estado actual de un pedido",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"}
            },
            "required": ["pedido_id"]
        }
    },
    {
        "name": "ver_productos_pedido",
        "description": "Listar los productos de un pedido",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"}
            },
            "required": ["pedido_id"]
        }
    },
    {
        "name": "generar_enlace_pago",
        "description": "Generar un enlace de pago para añadir un producto a un pedido",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"},
                "producto": {"type": "string"},
                "cantidad": {"type": "string"}
            },
            "required": ["pedido_id", "producto", "cantidad"]
        }
    },
    {
        "name": "obtener_info_pedido",
        "description": "Obtener detalles completos de un pedido desde la API de Wix",
        "parameters": {
            "type": "object",
            "properties": {
                "pedido_id": {"type": "string"}
            },
            "required": ["pedido_id"]
        }
    }
]

messages = [
    {"role": "system", "content": "Eres el asistente de atención al cliente de una tienda online de velas. Tu tono es amigable, juvenil y conciso, transmite buenas vibras pero siendo profesional. Usa emojis si queda natural. Si detectas que el cliente quiere hacer algo con un pedido (como cancelar, modificar datos, ver estado o añadir algo), llama a la función correspondiente. No respondas con tu texto si sabes que puedes resolverlo con una función."}
]

while True:
    user_input = input("Tú: ")
    if user_input.lower() == "salir":
        break

    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        functions=funciones_openai,
        function_call="auto"
    )

    msg = response.choices[0].message

    if msg.function_call:
        nombre_funcion = msg.function_call.name
        argumentos = json.loads(msg.function_call.arguments)

        if nombre_funcion == "cambiar_direccion":
            resultado = cambiar_direccion(**argumentos)
        elif nombre_funcion == "cambiar_email":
            resultado = cambiar_email(**argumentos)
        elif nombre_funcion == "cancelar_pedido":
            resultado = cancelar_pedido(**argumentos)
        elif nombre_funcion == "consultar_estado_pedido":
            resultado = consultar_estado_pedido(**argumentos)
        elif nombre_funcion == "ver_productos_pedido":
            resultado = ver_productos_pedido(**argumentos)
        elif nombre_funcion == "obtener_info_pedido":
            resultado = obtener_info_pedido(**argumentos)
        elif nombre_funcion == "generar_enlace_pago":
            resultado = generar_enlace_pago(**argumentos)
        else:
            resultado = "Función desconocida."

        messages.append({
            "role": "function",
            "name": nombre_funcion,
            "content": resultado
        })

        final_response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )

        print("Bot:", final_response.choices[0].message.content)
        messages.append({"role": "assistant", "content": final_response.choices[0].message.content})
    else:
        print("Bot:", msg.content)
        messages.append({"role": "assistant", "content": msg.content})

fecha = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
with open(f"historial_chat_{fecha}.txt", "w", encoding="utf-8") as f:
    for msg in messages:
        if msg["role"] == "user":
            f.write(f"Tú: {msg['content']}\n")
        elif msg["role"] == "assistant":
            f.write(f"Bot: {msg['content']}\n")