import requests
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("WIX_CLIENT_ID")
CLIENT_SECRET = os.getenv("WIX_CLIENT_SECRET")
REDIRECT_URI = os.getenv("WIX_REDIRECT_URI")
AUTHORIZATION_CODE = os.getenv("WIX_AUTHORIZATION_CODE")

def obtener_tokens():
    url = "https://www.wix.com/oauth/access"

    data = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": AUTHORIZATION_CODE,
        "redirect_uri": REDIRECT_URI
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        tokens = response.json()
        print("✅ Access Token:", tokens["access_token"])
        print("🔁 Refresh Token:", tokens["refresh_token"])
        return tokens
    else:
        print("❌ Error al obtener los tokens:", response.text)
        return None

if __name__ == "__main__":
    obtener_tokens()