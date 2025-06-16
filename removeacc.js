Java.perform(() => {
    const AccountManager = Java.use("android.accounts.AccountManager");
    const Account = Java.use("android.accounts.Account");
    const ActivityThread = Java.use("android.app.ActivityThread");
    const context = ActivityThread.systemMain().getSystemContext();
    const am = AccountManager.get(context);

    const accounts = am.getAccounts();
    console.log("[*] Found " + accounts.length + " accounts");

    for (let i = 0; i < accounts.length; i++) {
        let acc = accounts[i];
        console.log(`→ ${acc.name} [${acc.type}]`);
        if (acc.type.value === "com.garena.msdk100067max") {
            let result = am.removeAccountExplicitly(acc);
            console.log(`[+] Garena account removed: ${result}`);
        }
    }
});
