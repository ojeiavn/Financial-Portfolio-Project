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
        
class CompanyList(Resource):
    # Adding the default get method
    def get(self):
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute("SELECT * FROM Companies")
        companies = mycursor.fetchall()
        mycursor.close()
        return jsonify(companies)
    
class Company(Resource):
    # Adding the default get method
    def get(self, symbol):
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute(f"SELECT * FROM Companies where Symbol={symbol}")
        companies = mycursor.fetchall()
        mycursor.close()
        return jsonify(companies)
    
api.add_resource(CompanyList, '/api/companylist')
api.add_resource(Company, '/api/company/<symbol>')

if __name__ == "__main__":
    dbconn()
    try:
        app.run(debug=True, host="0.0.0.0")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection when the application terminates
        mydb.close()