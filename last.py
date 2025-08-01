import base64
import hashlib
import hmac
from crypto.Protocol.KDF import PBKDF2
from crypto.Hash import SHA1

# === Constants from frida log ===
password = "RQz33k7wn3WSF7iAa5FzRh"
salt = base64.b64decode("AAAAAAAAAAA=")
iterations = 10000
key_length = 64  # 512 bits = 64 bytes (as seen in your app source)

# === Derive keys using PBKDF2 ===
full_key = PBKDF2(password, salt, dkLen=key_length, count=iterations, hmac_hash_module=SHA1)

# Split into AES + HMAC keys (like in your app)
aes_key = full_key[:32]     # First 32 bytes for AES
hmac_key = full_key[32:]    # Remaining 32 bytes for HMAC

# === Data to be signed ===
data = "password=C447CB9ACE8BEFA9A71FEA324A83F5024D03F737E488B5E3E006FDEE8F964F50&client_type=2&source=2&app_id=100067"
data_bytes = data.encode('utf-8')

# === Perform HMAC ===
hmac_result = hmac.new(hmac_key, data_bytes, hashlib.sha256).digest()
hmac_b64 = base64.b64encode(hmac_result).decode()

# === Output ===
print("AES Key (Base64):", base64.b64encode(aes_key).decode())
print("HMAC Key (Base64):", base64.b64encode(hmac_key).decode())
print("Signature:", hmac_b64)
