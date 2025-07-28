

import requests
import json
import os
from dotenv import load_dotenv

# Cargar variables desde .env
load_dotenv()

ACCESS_TOKEN = os.getenv("WIX_ACCESS_TOKEN")

# Endpoint de productos de Wix Stores
url = "https://www.wixapis.com/stores/v1/products/query"

headers = {
    "Authorization": ACCESS_TOKEN,
    "Content-Type": "application/json"
}

# Puedes ajustar esto según lo que quieras filtrar
body = {
    "query": {}
}

response = requests.post(url, headers=headers, json=body)

if response.status_code == 200:
    productos = response.json()
    print(json.dumps(productos, indent=2, ensure_ascii=False))
else:
    print(f"Error {response.status_code}: {response.text}")