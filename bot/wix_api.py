

import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

def cargar_token():
    with open("wix_tokens.json", "r") as f:
        tokens = json.load(f)
    return tokens["access_token"]

ACCESS_TOKEN = cargar_token()
BASE_URL = "https://www.wixapis.com"

def get_order_details(order_id):
    url = f"{BASE_URL}/ecom/v1/orders/{order_id}"
    headers = {
        "Authorization": ACCESS_TOKEN,
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, headers=headers)
        print(f"[DEBUG] Status Code: {response.status_code}")
        print(f"[DEBUG] Response Text: {response.text}")

        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Error al consultar el pedido: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Excepción al llamar a la API: {str(e)}")
        return None