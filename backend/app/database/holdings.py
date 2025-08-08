from flask import request, jsonify
from database.db import conn
from database.db import app
import yfinance

# GET all holdings
@app.route('/holdings', methods=['GET'])
def getHoldings():
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Holdings')
        holdings = cursor.fetchall()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch holdings', 'details': str(e)}), 500
    finally:
        cursor.close()
    for holding in holdings:
        holding["CurrentPrice"]=yfinance.Ticker(holding.get("Symbol")).fast_info.last_price
    return jsonify(holdings)


# GET a single holding by ID
@app.route('/holdings/<int:holding_id>', methods=['GET'])
def getHolding(holding_id):
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
def addHolding():
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
        cursor.execute('SELECT Username FROM Users WHERE Username = %s', (username,))
        if not cursor.fetchone():
            return jsonify({'error': 'User not found'}), 404

        # Check if product exists
        cursor.execute('SELECT Symbol FROM Products WHERE Symbol = %s', (symbol,))
        if not cursor.fetchone():
            try:
                productInfo=yfinance.Ticker(symbol).info
                
                if("longName" not in productInfo):
                    return jsonify({'error': 'Symbol not found'}), 404
                
                type="Bond"
                name=productInfo.get("longName")
                
                if(symbol[0]!='^'):
                    if("city" in productInfo):
                        type="Stock"
                        cursor.execute(
                            'INSERT INTO Companies (Symbol, Country, Phone, Website) VALUES (%s, %s, %s, %s)',
                            (symbol, productInfo.get("country"), productInfo.get("phone"), productInfo.get("website"))
                        )
                    else:
                        type="Cash"
                        
                cursor.execute(
                    'INSERT INTO Products (Symbol, Name, Type) VALUES (%s, %s, %s)',
                    (symbol, name, type)
                )
                conn.commit()
            except Exception as e:
                cursor.close()
                return jsonify({'error': str(e)}), 400

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
def updateHolding(holding_id):
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
def deleteHolding(holding_id):
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