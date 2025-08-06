from flask import Flask, jsonify
from flask_restful import Resource, Api
import mysql.connector

app = Flask("api")
api = Api(app)

def dbconn():
    try: 
        global mydb
        mydb = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "n3u3da!",
            database = "Portfolio"
        )
        print(mydb)
    except Exception as e:
        print(f"Error connecting to database {e}")
        
# GET all companies
@app.route('/companies', methods=['GET'])
def get_companies():
    try:
        cursor = mydb.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Companies")
        companies = cursor.fetchall()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch companies', 'details': str(e)}), 500
    finally:
        cursor.close()
    return jsonify(companies)
    
# GET a single company by ID
@app.route('/companies/<string:symbol>', methods=['GET'])
def get_company(symbol):
    try:
        cursor = mydb.cursor(dictionary=True)
        cursor.execute(f"SELECT * FROM Companies where Symbol={symbol}")
        company = cursor.fetchone()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch company', 'details': str(e)}), 500
    finally:
        cursor.close()
    return jsonify(company)

# DELETE holding by ID
@app.route('/holdings/<string:symbol>', methods=['DELETE'])
def delete_holding(symbol):
    try:
        cursor = mydb.cursor(dictionary=True)
        cursor.execute('DELETE FROM Companies WHERE Symbol = %s', (symbol))
        mydb.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Company not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to delete company', 'details': str(e)}), 500
    finally:
        cursor.close()

    return jsonify({'message': 'Company deleted successfully'})

if __name__ == "__main__":
    dbconn()
    try:
        app.run(debug=True, host="0.0.0.0")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection when the application terminates
        mydb.close()