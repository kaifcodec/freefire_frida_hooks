Java.perform(function () {
    var FileInputStream = Java.use("java.io.FileInputStream");
    FileInputStream.$init.overload('java.io.File').implementation = function (file) {
        console.log("[READ] " + file.getAbsolutePath());
        return this.$init(file);
    };

    var FileOutputStream = Java.use("java.io.FileOutputStream");
    FileOutputStream.$init.overload('java.io.File').implementation = function (file) {
        console.log("[WRITE] " + file.getAbsolutePath());
        return this.$init(file);
    };
});
