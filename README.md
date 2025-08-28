


# 🧠 Bot IA Base

Este proyecto es un esqueleto funcional de un bot con inteligencia artificial, ideal para integrarlo con APIs externas, usar Function Calling con OpenAI y responder a usuarios por consola o desde otros canales.

## ✅ Características incluidas

- API lista para recibir mensajes con FastAPI.
- Lógica de conexión con OpenAI.
- Soporte para function calling.
- Estructuras de entrada/salida (`schemas.py`).
- Sistema de handlers para definir las acciones que ejecuta el bot.
- Variables de entorno simuladas para configurar el entorno.
- Archivo de pruebas para probar el bot desde consola.

## 📁 Estructura

```
bot_ia_base/
├── main.py                  # Punto de entrada, lanza el servidor
├── config.py                # Carga las variables del entorno
├── .env.example             # Variables necesarias (sin claves reales)
├── requirements.txt         # Dependencias del proyecto
├── README.md                # Este archivo
│
├── schemas/
│   └── chat.py              # Schemas para las peticiones y respuestas del bot
│
├── services/
│   └── openai.py            # Conexión con la API de OpenAI
│
├── functions/
│   └── handlers.py          # Funciones que el bot puede ejecutar
│
└── tests/
    └── test_bot.py          # Script para probar el bot desde consola
```

## 🛠️ ¿Cómo usarlo?

1. Clona este repositorio.
2. Crea tu archivo `.env` a partir de `.env.example` y añade tus claves reales.
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Ejecuta el bot:
   ```bash
   uvicorn main:app --reload
   ```
5. Usa `test_bot.py` para enviarle mensajes desde consola.

## 💬 ¿Para qué sirve?

Este bot base puede:
- Conectarse a servicios como OpenAI, Stripe, etc.
- Usar función calling para responder automáticamente según lo que diga el usuario.
- Ser integrado fácilmente en webs, WhatsApp, Discord, o usarlo solo desde terminal.

---

🎯 Ideal para vender como servicio base, integrar en tiendas online, automatizar tareas o montar un asistente virtual propio.