from flask import Flask, jsonify
from flask_restful import Resource, Api
import mysql.connector
from database import db
from database.db import app
from database import companies
from database import holdings
from database import products
from database import users
from database import finance

if __name__ == "__main__":
    db.dbconn()
    db.dbCreate()
    #db.dbDummy()
    try:
        app.run(debug=True, host="0.0.0.0")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection when the application terminates
        db.conn.close()