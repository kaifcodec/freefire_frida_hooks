Java.perform(function () {
    var MyClass = Java.use("com.dts.freefiremax.Whatever");  // Find the real class

    MyClass.methodName.implementation = function () {
        var blob = this.methodName();  // Replace accordingly
        console.log("🔥 DATA BLOB = " + blob);
        return blob;
    };
});
