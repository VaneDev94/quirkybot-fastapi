# Este script se conectará a la API de Wix para obtener los productos del catálogo
# y guardarlos en un archivo que el bot pueda usar directamente.

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

# 🔐 Token real si lo tenemos, si no usamos uno simulado para pruebas
ACCESS_TOKEN = os.getenv("WIX_ACCESS_TOKEN") or "eyJhbGciOiFakeTokenSoloParaTesteo12345..."

HEADERS = {
    "Authorization": ACCESS_TOKEN,
    "Content-Type": "application/json"
}

URL = "https://www.wixapis.com/stores/v1/products/query"

BODY = {
    "query": {},
    "paging": {"limit": 100}
}

# 🧠 Función real para obtener productos desde Wix
def obtener_catalogo():
    print("➡️ Enviando solicitud a:", URL)
    print("➡️ Headers:", HEADERS)
    response = requests.post(URL, headers=HEADERS, json=BODY)
    if response.status_code != 200:
        print(f"❌ Error al obtener productos: {response.status_code} - {response.text}")
        return

    datos = response.json()
    productos = datos.get("products", [])

    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, "productos_lara.txt")

    with open(file_path, "w", encoding="utf-8") as f:
        for producto in productos:
            nombre = producto.get("name", "Sin nombre")
            sku = producto.get("productId", "")
            f.write(f"{nombre}|{sku}\n")

    print(f"✅ Catálogo actualizado con {len(productos)} productos.")

# 🧪 Datos simulados como si vinieran de Wix
productos_simulados = [
    {"id": 1, "nombre": "Vela Good Vibes", "precio": 19.90},
    {"id": 2, "nombre": "Wax melt Un atardecer en la playa", "precio": 4.98},
    {"id": 3, "nombre": "Quemador Redondo", "precio": 23.90}
]

# 💬 Función para consultar productos simulados
def consultar_productos():
    print("🛍️ Productos disponibles:")
    for producto in productos_simulados:
        print(f"- {producto['nombre']} (${producto['precio']})")

# 📦 Función para consultar el estado de un pedido (simulado, preparado para Sendcloud)
def consultar_estado_pedido(pedido_id):
    estados_simulados = {
        "A123": "En preparación",
        "B456": "Enviado con Correos Express",
        "C789": "Entregado el 4 de junio"
    }

    estado = estados_simulados.get(pedido_id)
    if estado:
        print(f"📦 El pedido {pedido_id} está actualmente: {estado}.")
    else:
        print(f"❌ No se ha encontrado ningún pedido con el ID {pedido_id}.")

# 🏡 Función simulada para modificar la dirección de un pedido
def modificar_direccion(pedido_id, nueva_direccion):
    pedidos_editables = {
        "A123": {"direccion": "Calle antigua 1"},
        "B456": {"direccion": "Calle vieja 22"}
    }

    if pedido_id in pedidos_editables:
        pedidos_editables[pedido_id]["direccion"] = nueva_direccion
        print(f"✅ Dirección del pedido {pedido_id} actualizada a: {nueva_direccion}")
    else:
        print(f"❌ El pedido {pedido_id} no puede modificarse o no existe.")

# ❌ Función simulada para cancelar un pedido
def cancelar_pedido(pedido_id):
    pedidos_cancelables = ["A123", "B456"]

    if pedido_id in pedidos_cancelables:
        print(f"❌ Pedido {pedido_id} cancelado con éxito.")
    else:
        print(f"⚠️ No se puede cancelar el pedido {pedido_id}. Ya ha sido enviado o no existe.")

# 💳 Función simulada para generar un enlace de pago
def generar_enlace_pago(nombre_producto, precio):
    enlace_simulado = f"https://quirkyartbylara.com/pago?producto={nombre_producto.replace(' ', '%20')}&precio={precio}"
    print(f"🧾 Enlace de pago generado para '{nombre_producto}': {enlace_simulado}")

# 🔄 Testeo de todas las funciones
if __name__ == "__main__":
    # obtener_catalogo()  # Solo cuando tengamos token real
    # consultar_productos()
    # consultar_estado_pedido("B456")
    # modificar_direccion("A123", "Calle nueva 123")
    cancelar_pedido("A123")
    generar_enlace_pago("Wax Melt Bruma Tropical", 5.95)