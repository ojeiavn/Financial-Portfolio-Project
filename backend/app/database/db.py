# Manual DB Connector (MySQL)
import mysql.connector
from flask import Flask
from flask_restful import Api
from flask_cors import CORS  # Import CORS

def dbconn():
    try: 
        conn = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "n3u3da!",
            database = "Portfolio"
        )
        print(conn)
        return(conn)
    except Exception as e:
        print(f"Error connecting to database {e}")

conn = dbconn()

app = Flask("api")
CORS(app)  # Enable CORS right after app creation
api = Api(app)

def dbcreate():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="n3u3da!"
        )
    except Exception as e:
        print(f"Failed to connect to the database {e}")
        exit(1)

    # DDL to run
    createdb = "CREATE DATABASE IF NOT EXISTS Portfolio"
    usedb = "USE Portfolio"

    createUsers = """CREATE TABLE IF NOT EXISTS Users (
                Username VARCHAR(100) PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                Email VARCHAR(100) NOT NULL UNIQUE,
                Phone VARCHAR(20) NOT NULL UNIQUE
                );"""

    createProducts = """CREATE TABLE IF NOT EXISTS Products (
                    Symbol VARCHAR(10) PRIMARY KEY,
                    Name VARCHAR(100) NOT NULL,
                    Type ENUM('Stock', 'Bond', 'Cash') NOT NULL
                    );"""
                    
    createCompanies = """CREATE TABLE IF NOT EXISTS Companies (
                    Symbol VARCHAR(10) PRIMARY KEY,
                    Country VARCHAR(100),
                    Phone VARCHAR(50),
                    Website VARCHAR(100),
                    CONSTRAINT FK_Symbol
                        FOREIGN KEY (Symbol) REFERENCES Products(Symbol)
                        ON DELETE CASCADE
                    );"""

    createHoldings = """CREATE TABLE IF NOT EXISTS Holdings (
                    HoldingId INT AUTO_INCREMENT PRIMARY KEY,
                    Username VARCHAR(100) NOT NULL,
                    Symbol VARCHAR(10) NOT NULL,
                    Quantity DECIMAL(10, 2) NOT NULL,
                    Price DECIMAL(10, 2) NOT NULL,
                    CONSTRAINT FK_User
                        FOREIGN KEY (Username) REFERENCES Users(Username)
                        ON DELETE CASCADE,
                    CONSTRAINT FK_Product
                        FOREIGN KEY (Symbol) REFERENCES Products(Symbol)
                        ON DELETE CASCADE
                    );"""

    actions = [createdb, usedb, createUsers, createProducts, createCompanies, createHoldings]

    # Create the database DDL
    try:
        cursor = conn.cursor(dictionary=True, buffered=True)  # buffered ensures tables created before inserts
        for action in actions:
            cursor.execute(action)
    except Exception as e:
        print(f"Failed to create the database {e}")
    finally:
        cursor.close()
        conn.close()

def dbdummy():
    sql = "INSERT INTO Users VALUES(%s,%s,%s,%s)"
    data = [
        ('Fridah','Fridah','Fridah@email.com','+1 123 456 7890'),
        ('Iqra','Iqra Moalin','Iqra@email.com','+1 123 456 7891'),
        ('Ojei','Ojei Imiavan','Ojei@email.com','+1 123 456 7892'),
        ('Sreya','Sreya Ramachandran','Sreya@email.com','+1 123 456 7893'),
        ('Viktor','Viktor Volgyi','Viktor@email.com','+1 123 456 7894')
    ]

    sql2 = "INSERT INTO Products VALUES(%s,%s,%s)"
    data2 = [
        ('NVDA', 'NVIDIA Corporation', 'Stock'),
        ('INTC', 'Intel Corporation', 'Stock'),
        ('AMD', 'Advanced Micro Devices, Inc.', 'Stock'),
        ('^IRX', '13 WEEK TREASURY BILL', 'Bond'),
        ('^FVX', 'Treasury Yield 5 Years', 'Bond'),
        ('^TNX', 'CBOE Interest Rate 10 Year T No', 'Bond'),
        ('EURUSD=X', 'EUR/USD', 'Cash'),
        ('JPY=X', 'USD/JPY', 'Cash'),
        ('GBPUSD=X', 'GBP/USD', 'Cash')
    ]

    sql3 = "INSERT INTO Companies VALUES(%s,%s,%s,%s)"
    data3 = [
        ('NVDA', 'United States', '408 486 2000', 'https://www.nvidia.com'),
        ('INTC', 'United States', '408 765 8080', 'https://www.intel.com'),
        ('AMD', 'United States', '408 749 4000', 'https://www.amd.com')
    ]

    # Fix here: Do NOT insert HoldingId (auto-increment)
    sql4 = "INSERT INTO Holdings (Username, Symbol, Quantity, Price) VALUES (%s,%s,%s,%s)"
    data4 = [
        ('Fridah', 'NVDA', 1, 177.95),
        ('Fridah', 'INTC', 1, 20.27),
        ('Fridah', 'AMD', 1, 174.10),
        ('Fridah', '^IRX', 1, 4.1500),
        ('Fridah', '^FVX', 1, 3.7570),
        ('Fridah', '^TNX', 1, 4.1980),
        ('Fridah', 'EURUSD=X', 1, 1.1577),
        ('Fridah', 'JPY=X', 1, 147.4020),
        ('Fridah', 'GBPUSD=X', 1, 1.3305)
    ]

    try:
        cursor = conn.cursor(dictionary=True, buffered=True)
        for row in data:
            cursor.execute(sql, row)
        for row in data2:
            cursor.execute(sql2, row)
        for row in data3:
            cursor.execute(sql3, row)
        for row in data4:
            cursor.execute(sql4, row)
        conn.commit()
    except Exception as e:
        print(f"Failed to insert data {e}")
        exit(4)
    finally:
        cursor.close()
