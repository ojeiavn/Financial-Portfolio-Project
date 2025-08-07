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