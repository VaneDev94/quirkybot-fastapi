import os
import psycopg2

def conectar():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME", "bot_lara"),
        user=os.getenv("DB_USER", "usuario"),
        password=os.getenv("DB_PASSWORD", ""),
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432")
    )