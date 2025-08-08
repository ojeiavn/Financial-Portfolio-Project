from flask import request, jsonify
from database.db import conn
from database.db import app
        
# GET all companies
@app.route('/companies', methods=['GET'])
def getCompanies():
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Companies")
        companies = cursor.fetchall()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch companies', 'details': str(e)}), 500
    finally:
        cursor.close()
    return jsonify(companies)
    
# GET a single company by symbol
@app.route('/companies/<symbol>', methods=['GET'])
def getCompany(symbol):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Companies WHERE Symbol=%s", (symbol,))
        company = cursor.fetchone()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch company', 'details': str(e)}), 500
    finally:
        cursor.close()
    return jsonify(company)

# DELETE comapny by symbol
@app.route('/companies/<symbol>', methods=['DELETE'])
def deleteCompany(symbol):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('DELETE FROM Companies WHERE Symbol = %s', (symbol,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Company not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to delete company', 'details': str(e)}), 500
    finally:
        cursor.close()

    return jsonify({'message': 'Company deleted successfully'})