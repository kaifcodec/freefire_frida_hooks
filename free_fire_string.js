Java.perform(function () {
    const StringClass = Java.use("java.lang.String");
    const MessageDigest = Java.use("java.security.MessageDigest");
    const Log = Java.use("android.util.Log");
    const Exception = Java.use("java.lang.Exception");

    function byteArrToStr(javaByteArr) {
        const jsBytes = [];
        for (let i = 0; i < javaByteArr.length; i++) {
            jsBytes.push(javaByteArr[i]);
        }
        return String.fromCharCode.apply(null, jsBytes.map(b => b & 0xff));
    }

    function printStackTrace(tag) {
        const trace = Log.getStackTraceString(Exception.$new());
        console.log(`[${tag}] Stack trace:\n${trace}`);
    }

    // 🧵 Hook String(byte[])
    StringClass.$init.overload('[B').implementation = function (b) {
        const result = this.$init(b);
        try {
            const decoded = byteArrToStr(b);
            if (decoded.length >= 8 && decoded.length <= 100) {
                console.log("[📦] new String(byte[]) =>", decoded);
                printStackTrace("📦");
            }
        } catch (e) {
            console.error("Error in byteArrToStr(byte[]):", e);
        }
        return result;
    };

    // 🔤 Hook String(byte[], charset)
    StringClass.$init.overload('[B', 'java.lang.String').implementation = function (b, charset) {
        const result = this.$init(b, charset);
        try {
            const decoded = byteArrToStr(b);
            if (decoded.length >= 8 && decoded.length <= 100) {
                console.log(`[📦] new String(byte[], ${charset}) =>`, decoded);
                printStackTrace("📦");
            }
        } catch (e) {
            console.error("Error in byteArrToStr(byte[], charset):", e);
        }
        return result;
    };

    // 🧪 Hook digest.update(byte[])
    MessageDigest.update.overload('[B').implementation = function (b) {
        try {
            const data = byteArrToStr(b);
            console.log("[🧪] digest.update(byte[]):", data);
            printStackTrace("🧪");
        } catch (e) {
            console.error("Error in digest.update:", e);
        }
        return this.update(b);
    };

    // 🔐 Hook digest()
    MessageDigest.digest.overload().implementation = function () {
        console.log("[🔐] MessageDigest.digest() called");
        printStackTrace("🔐");
        return this.digest();
    };
});
