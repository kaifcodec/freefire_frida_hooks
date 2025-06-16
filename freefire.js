/*
 * dump_signature_key.js
 *
 * Hooks the custom HMAC signer and the underlying javax.crypto.Mac
 * to dump the signatureKey, the raw message, and the computed HMAC.
 */

if (Java.available) {
  Java.perform(function () {

    // 1. Hook the custom signer: i2.p.a(String, String)
    try {
      var SigClass = Java.use("i2.p");
      SigClass.a.overload('java.lang.String', 'java.lang.String').implementation = function (signatureKey, message) {
        // Log the key and message exactly as the app saw them:
        console.log("🔑 [CustomSigner] signatureKey:", signatureKey);
        console.log("📥 [CustomSigner] message    :", message);
        // Call through to get the real HMAC:
        var result = this.a(signatureKey, message);
        console.log("🔐 [CustomSigner] HMAC       :", result);
        return result;
      };
      console.log("[+] Hooked custom signer i2.p.a(String, String)");
    } catch (e) {
      console.error("[-] Failed to hook i2.p.a:", e);
    }

    // 2. Hook javax.crypto.Mac.doFinal(byte[])
    try {
      var Mac = Java.use("javax.crypto.Mac");
      Mac.doFinal.overload('[B').implementation = function (data) {
        // Log the raw data bytes as Base64
        var Base64 = Java.use("android.util.Base64");
        console.log("📥 [Mac.doFinal] data (B64):", Base64.encodeToString(data, 0));
        // Call original
        var hmac = this.doFinal(data);
        console.log("🔐 [Mac.doFinal] result (B64):", Base64.encodeToString(hmac, 0));
        return hmac;
      };
      console.log("[+] Hooked javax.crypto.Mac.doFinal");
    } catch (e) {
      console.error("[-] Failed to hook Mac.doFinal:", e);
    }

    // 3. Hook SecretKeySpec init to capture the raw key bytes
    try {
      var SKS = Java.use("javax.crypto.spec.SecretKeySpec");
      SKS.$init.overload('[B', 'java.lang.String').implementation = function (keyBytes, algorithm) {
        var Base64 = Java.use("android.util.Base64");
        console.log("🔑 [SecretKeySpec] algorithm:", algorithm);
        console.log("🔑 [SecretKeySpec] key (B64) :", Base64.encodeToString(keyBytes, 0));
        return this.$init(keyBytes, algorithm);
      };
      console.log("[+] Hooked SecretKeySpec constructor");
    } catch (e) {
      console.error("[-] Failed to hook SecretKeySpec:", e);
    }

  });
} else {
  console.error("Java VM not available");
}
