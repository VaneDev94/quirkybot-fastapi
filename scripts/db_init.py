import psycopg2

# Conexión a la base de datos
conn = psycopg2.connect(
    dbname="bot_lara",
    user="vane",         # tu usuario del Mac
    host="localhost",
    password="141994",         # si no tienes contraseña, lo dejas vacío
    port=5432
)
cur = conn.cursor()

# Crear tablas
cur.execute("""
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio DECIMAL,
    categoria TEXT,
    aromas TEXT,
    stock INT,
    imagen_url TEXT
);
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    numero_pedido TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    direccion TEXT,
    productos TEXT,
    estado TEXT DEFAULT 'pendiente',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS historial_chat (
    id SERIAL PRIMARY KEY,
    pedido_id INT,
    mensaje_usuario TEXT,
    respuesta_bot TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);
""")

conn.commit()
cur.close()
conn.close()
print("Tablas creadas con éxito 🚀")