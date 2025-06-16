import hmac
import hashlib
import base64
import requests
import urllib.parse

# Step 1: Original request data
payload = {
    'password': "274C09E475D503C06AAD177F83C9F0ED9C9EEFB43684209ED63CA722F7C810AD", #example
    'client_type': "2",
    'source': "2",
    'app_id': "100067"
}

# Step 2: Sort the fields (important!)
sorted_items = sorted(payload.items())
query_string = "&".join(f"{k}={v}" for k, v in sorted_items)
msg_bytes = query_string.encode()

# Step 3: HMAC-SHA256 signature generation
secret_key = base64.b64decode("UlF6MzNrN3duM1dTRjdpQWE1RnpSaA==")
signature = hmac.new(secret_key, msg_bytes, hashlib.sha256).hexdigest()

# Step 4: Setup headers
headers = {
    'User-Agent': "GarenaMSDK/4.0.19P9(<device>;Android 10;en;US;)", # add yours
    'Connection': "Keep-Alive",
    'Accept-Encoding': "gzip",
    'Authorization': f"Signature {signature}"
}

# Step 5: Send the request
url = "https://ffmconnect.live.gop.garenanow.com/oauth/guest/register"
response = requests.post(url, data=payload, headers=headers)

print("[+] Signature:", signature)
print("[+] Response:", response.text)
