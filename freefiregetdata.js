Java.perform(function () {
    const SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl");

    // Hook the getString method to dump salt
    SharedPreferencesImpl.getString.overload('java.lang.String', 'java.lang.String').implementation = function (key, defValue) {
        const value = this.getString(key, defValue);
        if (key === "salt") {
            console.log("[🔑] Retrieved salt from SharedPreferences (Base64):", value);
        }
        return value;
    };

    const PBEKeySpec = Java.use("javax.crypto.spec.PBEKeySpec");
    PBEKeySpec.$init.overload('[C', '[B', 'int', 'int').implementation = function (password, salt, iterationCount, keyLength) {
        const passStr = Java.use('java.lang.String').$new(password);
        const saltBase64 = Java.use('android.util.Base64').encodeToString(salt, 0);
        console.log("[📥] PBKDF2 input:");
        console.log("     🔑 Password String:", passStr);
        console.log("     🧂 Salt (Base64):", saltBase64);
        console.log("     🔁 Iterations:", iterationCount);
        console.log("     📏 KeyLength:", keyLength);
        return this.$init(password, salt, iterationCount, keyLength);
    };

    const SecretKeySpec = Java.use("javax.crypto.spec.SecretKeySpec");
    SecretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function (keyBytes, algorithm) {
        const b64key = Java.use('android.util.Base64').encodeToString(keyBytes, 0);
        console.log(`[🔐] SecretKeySpec - Algorithm: ${algorithm}`);
        console.log("     📦 Key (Base64):", b64key);
        return this.$init(keyBytes, algorithm);
    };

    const Mac = Java.use("javax.crypto.Mac");
    Mac.doFinal.overload('[B').implementation = function (data) {
        const base64Data = Java.use('android.util.Base64').encodeToString(data, 0);
        const result = this.doFinal(data);
        const base64Result = Java.use('android.util.Base64').encodeToString(result, 0);
        console.log("[✍️] Mac.doFinal()");
        console.log("     📤 Input (Base64):", base64Data);
        console.log("     ✅ Result (Base64):", base64Result);
        return result;
    };
});
