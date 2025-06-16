Java.perform(function () {
    const L0 = Java.use("a5.l0");
    const ChallengeMethod = Java.use("a5.l0$a"); // <-- inner class

    L0.b.overload('java.lang.String', 'a5.l0$a').implementation = function (verifier, method) {
        console.log("[🔐] Hooked b():");
        console.log("     code_verifier: " + verifier);
        console.log("     method: " + method.name());
        const result = this.b(verifier, method);
        console.log("     code_challenge: " + result);
        return result;
    };
});
