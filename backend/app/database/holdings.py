from flask import request, jsonify
from database_flask_connection import app, get_db_connection
import mysql.connector
from run import mydb as conn

# GET all holdings
@app.route('/holdings', methods=['GET'])
def get_holdings():
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Holdings')
        holdings = cursor.fetchall()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch holdings', 'details': str(e)}), 500
    finally:
        cursor.close()
    return jsonify(holdings)


# GET a single holding by ID
@app.route('/holdings/<int:holding_id>', methods=['GET'])
def get_holding(holding_id):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Holdings WHERE HoldingId = %s', (holding_id,))
        holding = cursor.fetchone()
        if not holding:
            return jsonify({'error': 'Holding not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch holding', 'details': str(e)}), 500
    finally:
        cursor.close()
    return jsonify(holding)


# POST new holding
@app.route('/holdings', methods=['POST'])
def add_holding():
    data = request.get_json()
    username = data.get('username')
    symbol = data.get('symbol')
    quantity = data.get('quantity')
    price = data.get('price')

    # Validate inputs
    if not all([username, symbol, quantity, price]):
        return jsonify({'error': 'username, symbol, quantity, and price are required'}), 400
    try:
        quantity = float(quantity)
        price = float(price)
        if quantity <= 0 or price <= 0:
            return jsonify({'error': 'Quantity and price must be positive'}), 400
    except ValueError:
        return jsonify({'error': 'Quantity and price must be numbers'}), 400

    try:
        cursor = conn.cursor()

        # Check if user exists
        cursor.execute('SELECT Username FROM Users WHERE Username = %s', (username))
        if not cursor.fetchone():
            return jsonify({'error': 'User not found'}), 404

        # Check if product exists
        cursor.execute('SELECT Symbol FROM Products WHERE Symbol = %s', (symbol))
        if not cursor.fetchone():
            return jsonify({'error': 'Product not found'}), 404

        # Insert new holding
        cursor.execute('''
            INSERT INTO Holdings (Username, Symbol, Quantity, Price)
            VALUES (%s, %s, %s, %s)
        ''', (username, symbol, quantity, price))
        conn.commit()
    except Exception as e:
        return jsonify({'error': 'Failed to add holding', 'details': str(e)}), 500
    finally:
        cursor.close()

    return jsonify({'message': 'Holding added successfully'}), 201


# PUT update holding by ID
@app.route('/holdings/<int:holding_id>', methods=['PUT'])
def update_holding(holding_id):
    data = request.get_json()
    quantity = data.get('quantity')
    price = data.get('price')

    if quantity is None or price is None:
        return jsonify({'error': 'Quantity and price are required'}), 400

    try:
        quantity = float(quantity)
        price = float(price)
        if quantity <= 0 or price <= 0:
            return jsonify({'error': 'Quantity and price must be positive'}), 400
    except ValueError:
        return jsonify({'error': 'Quantity and price must be numbers'}), 400

    try:
        cursor = conn.cursor()
        cursor.execute('UPDATE Holdings SET Quantity = %s, Price = %s WHERE HoldingId = %s',
                       (quantity, price, holding_id))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Holding not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to update holding', 'details': str(e)}), 500
    finally:
        cursor.close()

    return jsonify({'message': 'Holding updated successfully'})


# DELETE holding by ID
@app.route('/holdings/<int:holding_id>', methods=['DELETE'])
def delete_holding(holding_id):
    try:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM Holdings WHERE HoldingId = %s', (holding_id,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Holding not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to delete holding', 'details': str(e)}), 500
    finally:
        cursor.close()

    return jsonify({'message': 'Holding deleted successfully'})