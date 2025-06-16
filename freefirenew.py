import base64, hashlib, hmac, os
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Hash import SHA1
import httpx

def generate_random_password():
    return os.urandom(32).hex().upper()  # 64-char hex string

def generate_signature(payload: str, password="RQz33k7wn3WSF7iAa5FzRh"):
    salt = base64.b64decode("AAAAAAAAAAA=")
    key = PBKDF2(password, salt, dkLen=64, count=10000, hmac_hash_module=SHA1)
    hmac_key = key[32:]
    sig = hmac.new(hmac_key, payload.encode(), hashlib.sha256).digest()
    return base64.b64encode(sig).decode()

def register_guest():
    password_hex = generate_random_password()
    payload = f"password={password_hex}&client_type=2&source=2&app_id=100067"
    signature = generate_signature(payload)

    headers = {
        "User-Agent": "<your_user_agent>", # Replace with your actual value
        "Authorization": f"Signature {signature}",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip"
    }

    r = httpx.post("https://ffmconnect.live.gop.garenanow.com/oauth/guest/register", data=payload, headers=headers)
    return {
        "status": r.status_code,
        "response": r.text,
        "used_password": password_hex
    }

# Example usage
result = register_guest()
print("🔑 Used password:", result["used_password"])
print("📬 Status:", result["status"])
print("📨 Response:", result["response"])
