from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/")
def read_root():
    return JSONResponse(
        content={"message": "QuirkyBot está vivo y funcionando en modo demo 🧠✨"},
        media_type="application/json; charset=utf-8"
    )

# --- Chat endpoint ---
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_endpoint(data: ChatRequest):
    user_message = data.message.strip().lower()

    # Simulación de respuestas reales del bot
    if "estado" in user_message or "pedido" in user_message:
        return {"response": "Puedes consultar el estado de tu pedido introduciendo tu número aquí 🧾"}
    elif "cancelar" in user_message:
        return {"response": "Para cancelar tu pedido, dime el número y lo gestionamos en un momento ❌"}
    elif "productos" in user_message:
        return {"response": "Tenemos velas aromáticas, mikados y Quirky Box 🕯️ ¿Qué te gustaría ver?"}
    else:
        return {"response": f"Has dicho: '{user_message}'. ¿En qué puedo ayudarte?"}