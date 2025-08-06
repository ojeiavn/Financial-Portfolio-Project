from flask import request, jsonify
from database_flask_connection import app, get_db_connection
import mysql.connector

# GET all users
@app.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Users')
        users = cursor.fetchall()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch users', 'details': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
    return jsonify(users)


# POST a new user
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    if not all([username, name, email, phone]):
        return jsonify({'error': 'Username, name, email, and phone are required'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO Users (Username, Name, Email, Phone) VALUES (%s, %s, %s, %s)',
            (username, name, email, phone)
        )
        conn.commit()
    except mysql.connector.IntegrityError:
        return jsonify({'error': 'Username, email, or phone already exists'}), 409
    except Exception as e:
        return jsonify({'error': 'Failed to add user', 'details': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({'message': 'User added successfully'}), 201


# PUT (update) a user by username
@app.route('/users/<string:username>', methods=['PUT'])
def update_user(username):
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    if not all([name, email, phone]):
        return jsonify({'error': 'Name, email, and phone are required'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'UPDATE Users SET Name = %s, Email = %s, Phone = %s WHERE Username = %s',
            (name, email, phone, username)
        )
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404

    except mysql.connector.IntegrityError:
        return jsonify({'error': 'Email or phone already exists'}), 409
    except Exception as e:
        return jsonify({'error': 'Failed to update user', 'details': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({'message': 'User updated successfully'})


# DELETE a user by username
@app.route('/users/<string:username>', methods=['DELETE'])
def delete_user(username):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM Users WHERE Username = %s', (username,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Failed to delete user', 'details': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({'message': 'User deleted successfully'})