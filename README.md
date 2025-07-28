

# QuirkyBotDev (Versión Portfolio)

Este proyecto es una versión adaptada del bot real de atención al cliente desarrollado para la tienda online (todavia no integrado) [quirkyartbylara.com](https://quirkyartbylara.com). Ha sido limpiado de datos sensibles para poder mostrarlo en mi portfolio como ejemplo real de integración de un bot IA con una tienda online.

## 🧠 ¿Qué hace este bot?

Este bot es capaz de:
- Conectarse con la API de OpenAI para interpretar y responder preguntas de forma inteligente.
- Obtener productos desde la tienda usando scraping con Selenium.
- Consultar y modificar pedidos mediante la API de Wix.
- Cancelar pedidos, cambiar dirección o email, y generar enlaces de pago.
- Guardar historial de conversaciones.
- Ejecutar acciones reales según la intención del usuario (function calling).
- Leer automáticamente el catálogo de productos y categorías de la tienda.

## ⚙️ Tecnologías usadas

- **Python**
- **FastAPI**
- **Selenium**
- **PostgreSQL**
- **OpenAI API**
- **Wix API (Backoffice y Storefront)**

## 📁 Estructura del proyecto

```
bot_lara/         ← Lógica principal del bot
scripts/          ← Scripts de utilidad y scraping
tests/            ← Pruebas automáticas (opcional)
.env.example      ← Variables de entorno de ejemplo
README.md         ← Este archivo
```

## 🧪 Variables de entorno necesarias

Renombra el archivo `.env.example` como `.env` y rellena tus propios datos:

```
OPENAI_API_KEY=tu_clave_openai
WIX_CLIENT_ID=tu_cliente_id
WIX_CLIENT_SECRET=tu_cliente_secret
REDIRECT_URI=http://localhost:3000/callback
BOT_NAME=QuirkyBot

DB_NAME=bot_lara
DB_USER=usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
```

## ⚠️ Aviso

Este proyecto no contiene datos reales, tokens ni claves válidas. Está adaptado para mostrar su funcionamiento sin comprometer la privacidad ni la seguridad del proyecto original.

---

## 🚀 ¿Cómo ejecutarlo en local?

1. **Clona el repositorio** y entra en la carpeta:
   ```bash
   git clone https://github.com/vanessamontero/QuirkyBotDev_GitHub.git
   cd QuirkyBotDev_GitHub
   ```

2. **Crea y activa un entorno virtual (opcional pero recomendado):**
   ```bash
   python -m venv env
   source env/bin/activate  # En Mac/Linux
   env\Scripts\activate     # En Windows
   ```

3. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Crea tu archivo `.env` a partir del `.env.example` y pon tus claves.**

5. **Ejecuta el bot (ejemplo para FastAPI o script):**
   ```bash
   uvicorn bot_lara.main:app --reload
   ```

   O si tienes un script específico para lanzar:
   ```bash
   python bot_lara/main.py
   ```
