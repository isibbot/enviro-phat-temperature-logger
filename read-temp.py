from envirophat import weather
from pymongo import MongoClient


client = MongoClient()

db = client.envirotemperature

temps = db.temperature

import datetime
tmp = weather.temperature();

templog = {"created": datetime.datetime.utcnow(), "reading": tmp}

temps.insert_one(templog).inserted_id

