import base64
import hmac
import hashlib
import time

# Replace this with your actual base64 key
KEY_B64 = "T7UZsTbvrRHgPs3RyFiS6wA=="
key = base64.b64decode(KEY_B64)

# Constructing the base blob manually
device_name = "eg."
android_id = "eg."
package = "com.dts.freefiremax"
timestamp = str(int(time.time()))
user_tag = "guest"  # possibly something like this

# Raw payload: assemble and encode
raw_blob = f"{device_name}:{android_id}:{package}:{timestamp}:{user_tag}"
raw_blob_bytes = raw_blob.encode()

# base64 encode this blob for the final version
raw_blob_b64 = base64.b64encode(raw_blob_bytes).decode()
print("[+] Raw Data B64:", raw_blob_b64)

# Generate HMAC-SHA256
password = hmac.new(key, raw_blob_bytes, hashlib.sha256).hexdigest().upper()
print("[+] Generated Password:", password)
