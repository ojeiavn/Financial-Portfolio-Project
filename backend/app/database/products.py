from flask import request, jsonify
from database_flask_connection import app, get_db_connection

# GET all products
@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Products')
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(products)

# GET single product by ID
@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Products WHERE Id = %s', (product_id,))
    product = cursor.fetchone()
    cursor.close()
    conn.close()
    if product:
        return jsonify(product)
    else:
        return jsonify({'error': 'Product not found'}), 404

# POST new product
@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    symbol = data.get('symbol')  # company symbol FK
    type_ = data.get('type')

    if not symbol or not type_:
        return jsonify({'error': 'Symbol and type are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Validate symbol exists in Companies
    cursor.execute('SELECT Symbol FROM Companies WHERE Symbol = %s', (symbol,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Invalid symbol: does not exist in Companies'}), 400

    try:
        cursor.execute(
            'INSERT INTO Products (Symbol, Type) VALUES (%s, %s)',
            (symbol, type_)
        )
        conn.commit()
    except Exception as e:
        cursor.close()
        conn.close()
        return jsonify({'error': str(e)}), 400

    cursor.close()
    conn.close()
    return jsonify({'message': 'Product added successfully'}), 201

# PUT update product
@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    symbol = data.get('symbol')
    type_ = data.get('type')

    if not symbol or not type_:
        return jsonify({'error': 'Symbol and type are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM Products WHERE Id = %s', (product_id,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Product not found'}), 404

    # Validate symbol exists in Companies
    cursor.execute('SELECT Symbol FROM Companies WHERE Symbol = %s', (symbol,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Invalid symbol: does not exist in Companies'}), 400

    cursor.execute(
        'UPDATE Products SET Symbol = %s, Type = %s WHERE Id = %s',
        (symbol, type_, product_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Product updated successfully'})

# DELETE product
@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Products WHERE Id = %s', (product_id,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Product not found'}), 404

    cursor.execute('DELETE FROM Products WHERE Id = %s', (product_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Product deleted successfully'})