import requests, secrets, hashlib

def gen_password():
    return secrets.token_hex(32).upper()

def get_signature(device_id, payload_str):
    return hashlib.sha256((device_id + payload_str).encode()).hexdigest()

def register_guest():
    password = 	"0E17690DF0F81C8D9357873AB44840C49122696B1FD30247C03A593CA42937A1"
    #gen_password()
    payload_str = f"password={password}&client_type=2&source=2&app_id=100067"

    # Random 64-char device_id (could be constant too if needed)
    device_id = "" # add yours 

    signature = get_signature(device_id, payload_str)

    payload = {
        'password': password,
        'client_type': "2",
        'source': "2",
        'app_id': "100067"
    }

    headers = {
        'User-Agent': "", # add yours
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip",
        'Authorization': f"Signature {signature}"
    }

    print(f"[+] Payload: {payload}")
    print(f"[+] Signature: {signature}")

    response = requests.post(
        "https://ffmconnect.live.gop.garenanow.com/oauth/guest/register",
        data=payload,
        headers=headers
    )
    print("[+] Response:", response.text)

register_guest()
