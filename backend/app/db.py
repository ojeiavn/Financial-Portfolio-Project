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


# sql = "INSERT INTO Passwords (Name, LoginID, Password, URL) VALUES(%s,%s,%s,%s)"
# data = [('Steve','superuser','secret123','http://there.com'),
#                      ('Jack','slipperysnake','letmein231','http://python.com'),
#                      ('Fridah','lovescoffee','letitmarinade','http://java.com')]

# sql2 = "INSERT INTO Passwords(Name,LoginID,Password,URL,DeleteDate) VALUES(%s,%s,%s,%s,%s)"
# data2 = ('Nick','omnipresent','nopasswordrequired','http://thatsmeinthecorner.com','1970-01-01 12:00:00')

# try:
#     for row in data:
#         mycursor.execute(sql,row)
#     mycursor.execute(sql2,data2)
#     mydb.commit()
# except Exception as e:
#     print(f"Failed to insert data {e}")
#     exit(4)

mydb.close()