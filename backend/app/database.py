import motor.motor_asyncio
import os
from dotenv import load_dotenv

# .env फाइल लोड कर रहे हैं
load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# कनेक्शन बनाना
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client[DB_NAME]

# यूजर टेबल (Collection) का रेफेरेंस
user_collection = database.get_collection("users")
