import time
import logging
import requests

PUBLIC = [
    "0xE3606710bc5d5C21fD5cC3De4F81e9629175BFfa",
    "0xb0bB5a146a64d8A59134F598E53F451b89Af0c92",
    "0xd6a2D60D0bCDAbFE249Bb3A9706aB2FD8979A7EF",
    "0xd6a2D60D0bCDAbFE249Bb3A9706aB2FD8979A7EF",
    "0xAC3A3488c52c4D297715597cf84F6E23b93aE6d5",
    "0xf8E9b1fD6656CD74A9B1De099011eE705C192E42",
    "0x7eedd639433A841711E3c3D19cEC35f08B4513b1",
    "0x4E19a0149a6cEA64a4b3C2398BC3aC86a08EA9a1",
    "0xfA326099B08AB5716D0088FBf38C65d819829EcF",
    "0x1BC13aC8EF7b375f349D8ECFBdE8b3400d89Ab3c",
    "0x17d545c8facE19D4E6419EDd2dBd44b7251161F0",
]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

while True:
    for public in range(len(PUBLIC)):
        r = requests.get(f"https://faucet.test.siberium.net/{PUBLIC[public]}")
        logger.log(logging.INFO, f"{r.status_code} {r.text}")
    time.sleep(600)
