from envirophat import weather
from pymongo import MongoClient
import datetime

client = MongoClient()

db = client.envirotemperature

temps = db.temperatures

tmp = weather.temperature()

templog = {
    "created": datetime.datetime.utcnow(), 
    "reading": tmp
    }

temps.insert_one(templog).inserted_id

