from flask import request, jsonify
from database.db import conn
from database.db import app
import yfinance

# GET news about stocks
@app.route('/news', methods=['GET'])
def get_news():
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM Products where Type="Stock"')
        products = cursor.fetchall()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch products', 'details': str(e)}), 500
    finally:
        cursor.close()
    news=[]
    for product in products:
        latestnewsinfos=yfinance.Ticker(product.get("Symbol")).news
        for newsinfo in latestnewsinfos:
            summary=newsinfo.get("content").get("summary")
            if(summary not in news):
                news.append(summary)
                break
    return jsonify(news)

# GET as news about a single stock by symbol
@app.route('/news/<symbol>', methods=['GET'])
def get_news_specific(symbol):
    newsinfos=yfinance.Ticker(symbol).news
    news=[]
    for newsinfo in newsinfos:
        news.append(newsinfo.get("content").get("summary"))
    return jsonify(news)

# GET quantity, total price and current price summary grouped by symbol
@app.route('/prices', methods=['GET'])
def get_prices():
    try:
        # Create a dictionary cursor to get results as dicts
        cursor = conn.cursor(dictionary=True)
        # SQL query to group holdings by symbol and calculate totals
        query = """
            SELECT Symbol, 
                   SUM(Quantity) AS Quantity, 
                   SUM(Quantity * Price) AS Price
            FROM Holdings
            GROUP BY Symbol
        """
# Executes the query
        cursor.execute(query)

# Fetches all results as a list of dictionaries
        results = cursor.fetchall()

    except Exception as e:
        # Handle any errors and return a JSON error response
        return jsonify({'error': 'Failed to fetch prices', 'details': str(e)}), 500

    finally:
        # Always close the cursor to free resources
        cursor.close()
    
    for result in results:
        result["CurrentPrice"]=yfinance.Ticker(result.get("Symbol")).fast_info.last_price*float(result.get("Quantity"))
    return jsonify(results)

# GET quantity, total price and current price summary grouped by symbol
@app.route('/allprices', methods=['GET'])
def get_allprices():
    try:
        # Create a dictionary cursor to get results as dicts
        cursor = conn.cursor(dictionary=True)
        # SQL query to group holdings by symbol and calculate totals
        query = """
            SELECT Symbol, 
                   SUM(Quantity) AS Quantity, 
                   SUM(Quantity * Price) AS Price
            FROM Holdings
            GROUP BY Symbol
        """
# Executes the query
        cursor.execute(query)

# Fetches all results as a list of dictionaries
        results = cursor.fetchall()

    except Exception as e:
        # Handle any errors and return a JSON error response
        return jsonify({'error': 'Failed to fetch prices', 'details': str(e)}), 500

    finally:
        # Always close the cursor to free resources
        cursor.close()
    
    AllPrices={"Prices":0, "CurrentPrices":0}
    for result in results:
        AllPrices["Prices"]=AllPrices.get("Prices")+result.get("Price")
        AllPrices["CurrentPrices"]=AllPrices.get("CurrentPrices")+yfinance.Ticker(result.get("Symbol")).fast_info.last_price*float(result.get("Quantity"))
    return jsonify(AllPrices)








