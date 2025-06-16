import base64
import hmac
import hashlib

# Secret key (base64 -> raw bytes)
key_b64 = "T7UZsTbvrRHgPs3RyFiS6wA==" # actual value captured during hook
key = base64.b64decode(key_b64)

# Set known device and parameters
android_id = "GarenaMSDK/4.0.19P9(device model ;Android 10;en;US;)"  # or your actual ID
app_id = "100067"
timestamp = "1749842055"  # captured from live request

# Create payload string: "android_id.app_id.timestamp"
data_string = f"{timestamp}"
print("[*] Input string:", data_string)

# Generate HMAC-SHA256
hmac_result = hmac.new(key, data_string.encode(), hashlib.sha256).hexdigest().upper()
print("[+] Generated password:", hmac_result)

# If you want to use it in an HTTP request:
print("\nUse this as `password` field in POST:")
print("password=" + hmac_result)
