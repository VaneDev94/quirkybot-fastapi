from time import sleep

# Pegas aquí la función simulada:
modo_prueba = True

def actualizar_datos_pedido_simulado(pedido_id, direccion, email):
    if modo_prueba:
        print("🔁 MODO PRUEBA ACTIVADO – no se conecta a Wix")
        print(f"📦 Pedido simulado: {pedido_id}")
        print(f"📫 Nueva dirección: {direccion}")
        print(f"📧 Nuevo email: {email}")
        return {"success": True, "mensaje": "Actualización simulada"}
    else:
        import requests
        url = "https://www.quirkyartbylara.com/_functions/actualizarDatosPedido"
        datos = {
            "pedidoId": pedido_id,
            "nuevaDireccion": direccion,
            "nuevoEmail": email
        }
        respuesta = requests.post(url, json=datos)
        return respuesta.json()

# Prueba simulada
print("Iniciando simulación...\n")
sleep(1)

respuesta = actualizar_datos_pedido_simulado("1234-FALSO", "Calle Inventada 123", "nuevo@email.com")

print("\nResultado:")
print(respuesta)
