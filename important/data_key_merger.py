# THIS IS THE ACTUAL PROCESS WITH WHICH THE APP GENERATES PASSWORD

import base64
import hmac
import hashlib

key_b64 = "T7UZsTbvrRHgPs3RyFiS6wA=="
data_b64 = "jPcbkeWn/6JbJHBssWYKAiOpdHPeOmfGw44irr7tEDAvEp1eOCAgJaP4YBz6W6yyvtMkc9ZbBD7gporwREXH6ocYPc5NOHaAFzHh7SbbxGzjLVX9s9JGraV+Jd9xvyRoSPX4v/fvvgQZlyVKTDDBUcUucaGkSDUgv5+7nJXEsm9WnlwUYUdQSUGFtiEMyRiuQs8dEJ07wfBoCuYsD+ZV48bbbukXknE3x1Kn"

# Decode base64 to raw bytes
key = base64.b64decode(key_b64)
data = base64.b64decode(data_b64)

# HMAC-SHA256
hmac_result = hmac.new(key, data, hashlib.sha256).digest()

# Print result
print("Generated Password (HEX):", hmac_result.hex().upper())
print("Generated Password (Base64):", base64.b64encode(hmac_result).decode())
