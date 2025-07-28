import requests
import json
import base64
import os
from dotenv import load_dotenv

# Carga las variables del .env
load_dotenv()

CLIENT_ID = os.getenv("WIX_CLIENT_ID")
CLIENT_SECRET = os.getenv("WIX_CLIENT_SECRET")
REDIRECT_URI = os.getenv("WIX_REDIRECT_URI")
TOKENS_FILE = "wix_tokens.json"

def guardar_tokens(access_token, refresh_token):
    with open(TOKENS_FILE, "w") as f:
        json.dump({
            "access_token": access_token,
            "refresh_token": refresh_token
        }, f)
    print("✅ Tokens guardados en wix_tokens.json")

def cargar_refresh_token():
    if os.path.exists(TOKENS_FILE):
        with open(TOKENS_FILE, "r") as f:
            tokens = json.load(f)
            return tokens.get("refresh_token")
    return None

def renovar_token():
    refresh_token = cargar_refresh_token()
    if not refresh_token:
        print("❌ No hay refresh token guardado.")
        return

    url = "https://www.wix.com/oauth/access"

    headers = {
        "Authorization": "Basic " + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode(),
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        tokens = response.json()
        guardar_tokens(tokens["access_token"], tokens["refresh_token"])
        print("🔁 Token renovado correctamente")
        return tokens["access_token"]
    else:
        print("❌ Error al renovar el token:", response.text)
        return None

if __name__ == "__main__":
    renovar_token()