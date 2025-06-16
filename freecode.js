Java.perform(function () {
    const Bundle = Java.use("android.os.Bundle");
    const TargetClass = Java.use("v3.j0"); // or replace with actual class if different

    TargetClass.H.overload("android.os.Bundle").implementation = function (bundle) {
        console.log("\n[📦] Hooked: oauth/access_token Bundle contents");

        const keys = bundle.keySet().toArray();
        for (let i = 0; i < keys.length; i++) {
            try {
                const key = keys[i];
                const value = bundle.get(key);
                console.log(`   ${key}: ${value}`);
            } catch (err) {
                console.log("   [!] Error reading bundle key:", err);
            }
        }

        // Optionally print a full stack trace
        const Exception = Java.use("java.lang.Exception");
        console.log("\n[🧠] Stack trace:\n" + Exception.$new().getStackTrace().toString().replace(/,/g, "\n"));

        return this.H(bundle);
    };
});
