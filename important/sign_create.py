import base64
import hmac
import hashlib

# Frida dump
key_b64 = "T7UZsTbvrRHgPs3RyFiS6wA=="
data_b64 = "YxBWcZzseWvyc2rLnNVbekBoYXJ0dG9jY29TLnR0cySnCnVlZmlyZWtHeA=="

# Decode
key = base64.b64decode(key_b64)
data = base64.b64decode(data_b64)

# HMAC SHA256
hmac_result = hmac.new(key, data, hashlib.sha256).digest()

# Show result
print("Generated Password:", hmac_result.hex().upper())
