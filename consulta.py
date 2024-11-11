import sqlite3

# Conectar a la base de datos (la base de datos se abrirá si no existe)
conn = sqlite3.connect('ecommerce7.db')
cursor = conn.cursor()

# Listar las tablas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print(tables)

# Cerrar la conexión
conn.close()