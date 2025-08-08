from flask import request, jsonify
from database.db import conn
from database.db import app

# GET all products
@app.route('/products', methods=['GET'])
def get_products():
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Products')
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products)

# GET single product by ID
@app.route('/products/<symbol>', methods=['GET'])
def get_product(symbol):
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Products WHERE Symbol = %s', (symbol,))
    product = cursor.fetchone()
    cursor.close()
    if product:
        return jsonify(product)
    else:
        return jsonify({'error': 'Product not found'}), 404

# POST new product
@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    symbol = data.get('symbol')  # company symbol PK
    name = data.get('name')  # company name
    type = data.get('type')

    if not symbol or not type or not name:
        return jsonify({'error': 'Symbol, type and name are required'}), 400
    
    cursor = conn.cursor()

    try:
        cursor.execute(
            'INSERT INTO Products (Symbol, Name, Type) VALUES (%s, %s, %s)',
            (symbol, name, type)
        )
        conn.commit()
    except Exception as e:
        cursor.close()
        return jsonify({'error': str(e)}), 400

    cursor.close()
    return jsonify({'message': 'Product added successfully'}), 201

# PUT update product
@app.route('/products/<symbol>', methods=['PUT'])
def update_product(symbol):
    data = request.get_json()
    name = data.get('name')
    type = data.get('type')

    if not name or not type:
        return jsonify({'error': 'Name and type are required'}), 400

    cursor = conn.cursor()

    cursor.execute('SELECT * FROM Products WHERE Symbol = %s', (symbol,))
    if cursor.fetchone() is None:
        cursor.close()
        return jsonify({'error': 'Product not found'}), 404

    cursor.execute(
        'UPDATE Products SET Name = %s, Type = %s WHERE Symbol = %s',
        (name, type, symbol)
    )
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Product updated successfully'})

# DELETE product
@app.route('/products/<symbol>', methods=['DELETE'])
def delete_product(symbol):
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Products WHERE Symbol = %s', (symbol,))
    if cursor.fetchone() is None:
        cursor.close()
        return jsonify({'error': 'Product not found'}), 404

    cursor.execute('DELETE FROM Products WHERE Symbol = %s', (symbol,))
    conn.commit()
    cursor.close()
    return jsonify({'message': 'Product deleted successfully'})