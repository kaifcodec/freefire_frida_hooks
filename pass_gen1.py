import base64
import hmac
import hashlib

# === CONFIGURATION ===

# 📦 This is the Base64 of the raw data being signed (from Frida logs)
# Replace this with any new blob you want to test
data_b64 = "YXBwc2ZseWVyc2RrLmNvbeKBo3Yx4oGjY29tLmR0cy5mcmVlZmlyZW1heA=="

# 🔑 HMAC key used internally by the app (from Frida logs, Base64 format)
hmac_key_b64 = "UlF6MzNrN3duM1dTRjdpQWE1RnpSaA=="  # Decodes to: RQz33k7wn3WSF7iAa5FzRh

# === PROCESSING ===

data = base64.b64decode(data_b64)
key = base64.b64decode(hmac_key_b64)

# Generate HMAC-SHA256
password_bytes = hmac.new(key, data, hashlib.sha256).digest()

# Convert to uppercase hex
password = password_bytes.hex().upper()

print("[+] Raw Data (Base64):", data_b64)
print("[+] HMAC Key (Base64):", hmac_key_b64)
print("[+] Generated Password:", password)
