# Manual DB Connector (MySQL)
import mysql.connector

try:
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="n3u3da!"
    )
except Exception as e:
    print(f"Failed to connect to the database {e}")
    exit(1)

# DDL to run
createdb="CREATE DATABASE IF NOT EXISTS Portfolio"
usedb="USE Portfolio"
createCompanies="""CREATE TABLE IF NOT EXISTS Companies (
                Symbol VARCHAR(10) PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                Country VARCHAR(100),
                Phone VARCHAR(50),
                Website VARCHAR(100)
                );"""

createUsers="""CREATE TABLE IF NOT EXISTS Users (
            Username VARCHAR(100) PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,
            Email VARCHAR(100) NOT NULL UNIQUE,
            Phone VARCHAR(20) NOT NULL UNIQUE
            );"""

createProducts="""CREATE TABLE IF NOT EXISTS Products (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(10) NOT NULL,
                Type ENUM('Stock', 'Bond', 'Cash') NOT NULL,
                CONSTRAINT FK_Symbol
                    FOREIGN KEY (Symbol) REFERENCES Companies(Symbol)
                    ON DELETE SET NULL
                );"""
createHoldings="""CREATE TABLE IF NOT EXISTS Holdings (
                HoldingId INT AUTO_INCREMENT PRIMARY KEY,
                Username VARCHAR(100) NOT NULL,
                ProductId INT NOT NULL,
                Quantity DECIMAL(10, 2) NOT NULL,
                Price DECIMAL(10, 2) NOT NULL,
                CONSTRAINT FK_User
                    FOREIGN KEY (Username) REFERENCES Users(Username)
                    ON DELETE CASCADE,
                CONSTRAINT FK_Product
                    FOREIGN KEY (ProductId) REFERENCES Products(Id)
                    ON DELETE CASCADE
                );"""

actions=[createdb, usedb, createCompanies, createUsers, createProducts, createHoldings]

# Create the database DDL
try:
    mycursor = mydb.cursor(dictionary=True, buffered=True) # buffered ensures the tables are created before inserting data

    for action in actions:
        mycursor.execute(action)

except Exception as e:
    print(f"Failed to create the database {e}")


sql = "INSERT INTO Users VALUES(%s,%s,%s,%s)"
data = [('Fridah','Fridah','Fridah@email.com','+1 123 456 7890'),
        ('Iqra','Iqra Moalin','Iqra@email.com','+1 123 456 7891'),
        ('Ojei','Ojei Imiavan','Ojei@email.com','+1 123 456 7892'),
        ('Sreya','Sreya Ramachandran','Sreya@email.com','+1 123 456 7893'),
        ('Viktor','Viktor Volgyi','Viktor@email.com','+1 123 456 7894')]

sql2 = "INSERT INTO Companies VALUES(%s,%s,%s,%s,%s)"
data2 = [('NVDA', 'NVIDIA Corporation', 'United States', '408 486 2000', 'https://www.nvidia.com'),
         ('INTC', 'Intel Corporation', 'United States', '408 765 8080', 'https://www.intel.com'),
         ('AMD', 'Advanced Micro Devices, Inc.', 'United States', '408 749 4000', 'https://www.amd.com')]

sql3 = "INSERT INTO Products VALUES(%s,%s,%s)"
data3 = [(1, 'NVDA', 'Stock'),
         (2, 'INTC', 'Stock'),
         (3, 'AMD', 'Stock'),
         (4, '^IRX', 'Bond'),
         (5, '^FVX', 'Bond'),
         (6, '^TNX', 'Bond'),
         (7, 'EURUSD=X', 'Cash'),
         (8, 'JPY=X', 'Cash'),
         (9, 'GBPUSD=X', 'Cash')]

sql4 = "INSERT INTO Holdings VALUES(%s,%s,%s,%s,%s)"
data4 = [(1, 1, 'Fridah', 1, 177.95),
         (2, 2, 'Fridah', 1, 20.27),
         (3, 3, 'Fridah', 1, 174.10),
         (4, 4, 'Fridah', 1, 4.1500),
         (5, 5, 'Fridah', 1, 3.7570),
         (6, 6, 'Fridah', 1, 4.1980),
         (7, 7, 'Fridah', 1, 1.1577),
         (8, 8, 'Fridah', 1, 147.4020),
         (9, 9, 'Fridah', 1, 1.3305)]

try:
    for row in data:
        mycursor.execute(sql,row)
    for row in data2:
        mycursor.execute(sql2,row)
    for row in data3:
        mycursor.execute(sql3,row)
    for row in data4:
        mycursor.execute(sql4,row)
    mydb.commit()
except Exception as e:
    print(f"Failed to insert data {e}")
    exit(4)

mydb.close()