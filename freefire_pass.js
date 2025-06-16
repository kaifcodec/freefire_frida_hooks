Java.perform(function () {
    var MessageDigest = Java.use('java.security.MessageDigest');
    
    MessageDigest.getInstance.overload('java.lang.String').implementation = function (algo) {
        console.log('[🔍] Digest algo:', algo);
        return this.getInstance(algo);
    };

    MessageDigest.digest.overload().implementation = function () {
        var result = this.digest();
        console.log('[💥] MessageDigest.digest() called');
        console.log('[🧠] Result:', bytesToHex(result));
        return result;
    };

    MessageDigest.update.overload('[B').implementation = function (bytes) {
        console.log('[📥] Digest.update() with:', bytesToHex(bytes));
        return this.update(bytes);
    };

    function bytesToHex(bytes) {
        return Array.from(bytes).map(b =>
            ('0' + (b & 0xFF).toString(16)).slice(-2)
        ).join('').toUpperCase();
    }
});
