Java.perform(function () {
    const TargetClass = Java.use("i2.p");

    TargetClass.a.overload('java.lang.String', 'java.lang.String').implementation = function (arg1, arg2) {
        console.log("\n🔍 [HOOK] i2.p.a(String, String) called");
        console.log("   📥 arg1: " + arg1);
        console.log("   📥 arg2: " + arg2);

        const result = this.a(arg1, arg2);

        console.log("   🔐 result (password?): " + result);
        return result;
    };
});
