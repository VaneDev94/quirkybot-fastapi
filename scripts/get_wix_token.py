import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

client_id = os.getenv("WIX_CLIENT_ID")
client_secret = os.getenv("WIX_CLIENT_SECRET")
redirect_uri = os.getenv("WIX_REDIRECT_URI")
authorization_code = input("Pega aquí el código de autorización: ")

url = "https://www.wix.com/oauth/access"

data = {
    "grant_type": "authorization_code",
    "client_id": client_id,
    "client_secret": client_secret,
    "code": authorization_code,
    "redirect_uri": redirect_uri
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(data), headers=headers)

if response.status_code == 200:
    access_token = response.json()["access_token"]
    print("✅ Token conseguido.")
    
    # Añadirlo al .env
    with open(".env", "a") as env_file:
        env_file.write(f"\nWIX_ACCESS_TOKEN={access_token}")
    print("🔐 Token guardado en .env")
else:
    print("❌ Error al conseguir el token:", response.text)