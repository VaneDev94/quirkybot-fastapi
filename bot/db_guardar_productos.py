# Guardar en base de datos
import psycopg2
import json

conn = psycopg2.connect(
    dbname="bot_lara",
    user="vane",
    host="localhost"
)
cur = conn.cursor()

with open("productos_lara.json", "r", encoding="utf-8") as f:
    productos = json.load(f)

for producto in productos:
    nombre = producto["nombre"]
    descripcion = producto["descripcion"]
    precio = producto["precio"]
    stock = producto["stock"]
    categoria = producto["categoria"]

    cur.execute("""
        INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (nombre) DO UPDATE
        SET descripcion = EXCLUDED.descripcion,
            precio = EXCLUDED.precio,
            stock = EXCLUDED.stock,
            categoria = EXCLUDED.categoria;
    """, (nombre, descripcion, precio, stock, categoria))

conn.commit()
cur.close()
conn.close()