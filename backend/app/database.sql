-- Step 1: Create a fresh new database
CREATE DATABASE Portfolio;

-- Step 2: Switch to the new database
USE Portfolio;

-- Step 3: Create the Companies table
CREATE TABLE IF NOT EXISTS Companies (
    Symbol VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Country VARCHAR(100),
    Phone VARCHAR(50),
    Website VARCHAR(100)
);

-- Step 4 Create the Products table (all financial products)
CREATE TABLE IF NOT EXISTS Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Symbol VARCHAR(10) NOT NULL,
    Type ENUM('Stock', 'Bond', 'Cash') NOT NULL,
    CONSTRAINT FK_Symbol
        FOREIGN KEY (Symbol) REFERENCES Companies(Symbol)
        ON DELETE SET NULL
);

-- Step 5: Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    Username VARCHAR(100) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone VARCHAR(20) NOT NULL UNIQUE
);

-- Step 6: Create the Holdings table (linking Users to Products)
CREATE TABLE IF NOT EXISTS Holdings (
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
);

-- Optional: Confirm tables were created
SHOW TABLES;
