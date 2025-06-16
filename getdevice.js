Java.perform(() => {
    console.log("MODEL: " + android.os.Build.MODEL);
    console.log("MANUFACTURER: " + android.os.Build.MANUFACTURER);
    console.log("SERIAL: " + android.os.Build.SERIAL);
    console.log("PKG: " + Java.use("android.app.ActivityThread").currentApplication().getApplicationContext().getPackageName());
    console.log("ANDROID_ID: " + Java.use("android.provider.Settings$Secure").getString(Java.use("android.app.ActivityThread").currentApplication().getContentResolver(), "android_id"));
});
