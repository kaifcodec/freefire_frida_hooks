Java.perform(() => {
  const StringCls = Java.use("java.lang.String");
  const Base64 = Java.use("android.util.Base64");

  const PBEKeySpec = Java.use("javax.crypto.spec.PBEKeySpec");
  PBEKeySpec.$init.overload('[C', '[B', 'int', 'int').implementation = function (passwordChars, salt, iterations, keyLength) {
    const password = StringCls.$new(passwordChars).toString();
    const salt_b64 = Base64.encodeToString(salt, 0);

    console.log("\n🧠 [PBEKeySpec CONSTRUCTOR HOOK]");
    console.log("🔑 Password String: " + password);
    console.log("🧂 Salt (Base64): " + salt_b64);
    console.log("🔁 Iterations: " + iterations);
    console.log("📏 Key Length: " + keyLength);

    return this.$init(passwordChars, salt, iterations, keyLength);
  };

  const Cipher = Java.use("javax.crypto.Cipher");
  Cipher.doFinal.overload('[B').implementation = function (input) {
    console.log("\n🚀 [AES.doFinal]");
    console.log("📤 Plain Bytes (Base64): " + Base64.encodeToString(input, 0));
    const result = this.doFinal(input);
    console.log("📦 Encrypted Bytes (Base64): " + Base64.encodeToString(result, 0));
    return result;
  };

  const Mac = Java.use("javax.crypto.Mac");
  Mac.doFinal.overload().implementation = function () {
    const result = this.doFinal();
    console.log("\n🔏 [HMAC.doFinal]");
    console.log("✅ HMAC Result (Base64):", Base64.encodeToString(result, 0));
    return result;
  };

  const Encryptor = Java.use("aa.b");
  Encryptor.a.overload('android.content.Context', 'java.lang.String').implementation = function (ctx, clearText) {
    console.log("\n📦 [Encryptor.a] input:", clearText);
    const result = this.a(ctx, clearText);
    console.log("🔐 [Encryptor.a] output (Base64):", result);
    return result;
  };
});
