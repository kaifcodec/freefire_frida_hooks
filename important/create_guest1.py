import secrets
import hashlib
import requests
from urllib.parse import urlencode

def generate_code_verifier():
    return secrets.token_urlsafe(48)[:64]

def verifier_to_password(code_verifier):
    return hashlib.sha256(code_verifier.encode()).hexdigest().upper()

def get_signature(device_id, payload_str):
    return hashlib.sha256((device_id + payload_str).encode()).hexdigest()

def register_guest():
    code_verifier = generate_code_verifier()
    password = verifier_to_password(code_verifier)
    device_id = secrets.token_hex(32)

    payload = {
        "password": password,
        "client_type": "2",
        "source": "2",
        "app_id": "100067",
        "code_verifier": code_verifier  # 🔥 this might be critical!
    }

    payload_str = f"password={password}&client_type=2&source=2&app_id=100067"
    signature = get_signature(device_id, payload_str)

    headers = {
        "User-Agent": "", # add yours
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip",
        "Authorization": f"Signature {signature}",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    print(f"[🧠] Code Verifier: {code_verifier}")
    print(f"[🔐] Password: {password}")
    print(f"[🆔] Device ID: {device_id}")
    print(f"[🖊️] Signature: {signature}")
    print(f"[📦] Payload: {payload}")

    response = requests.post(
        "https://ffmconnect.live.gop.garenanow.com/oauth/guest/register",
        data=urlencode(payload),  # Important!
        headers=headers
    )

    print("[🌐] Response:", response.text)

register_guest()
