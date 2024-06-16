import time
import logging
import requests

PUBLIC = "0xE3606710bc5d5C21fD5cC3De4F81e9629175BFfa"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

while True:
    r = requests.get(f"https://faucet.test.siberium.net/{PUBLIC}")
    logger.log(logging.INFO, f"{r.status_code} {r.text}")
    time.sleep(600)
