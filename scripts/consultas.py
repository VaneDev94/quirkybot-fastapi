# scripts/consultas.py

def consultar_pedido(numero_pedido: str) -> dict:
    pedidos_falsos = {
        "12345": {
            "estado": "En camino",
            "productos": ["Vela de lavanda", "Mikado frutos rojos"],
            "total": "24.95€"
        },
        "67890": {
            "estado": "Pendiente de pago",
            "productos": ["Wax melt vainilla"],
            "total": "4.50€"
        }
    }

    return pedidos_falsos.get(numero_pedido, {"error": "Pedido no encontrado"})