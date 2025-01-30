from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mysql+pymysql://usuario:32Cas534mfs337hjs@localhost/biblioteca_upateco_final')
    SECRET_KEY = os.getenv("SECRET_KEY")