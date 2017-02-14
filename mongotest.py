from pymongo import MongoClient

client = MongoClient()

db = client.envirophat

temps = db.temperatures

import datetime

templog = {"temp": 99 ,"date": datetime.datetime.utcnow()}

temps.insert_one(templog).inserted_id

