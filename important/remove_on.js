Java.perform(function () {
    const AccountManager = Java.use('android.accounts.AccountManager');
    const Account = Java.use('android.accounts.Account');
    const context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
    const accountManager = AccountManager.get(context);
    const accountType = "com.garena.msdk100067max";

    function removeAccount(account) {
        try {
            console.log("[*] Attempting removeAccountExplicitly...");
            accountManager.removeAccountExplicitly(account);
            console.log("[+] Removed via removeAccountExplicitly: " + account.name.value);
        } catch (e) {
            console.log("[-] Explicit removal failed: " + e);
            console.log("[*] Trying legacy removeAccount...");
            const handler = Java.use("android.os.Handler").$new();
            const callback = Java.registerClass({
                name: 'com.kaif.AccountRemovalCallback',
                implements: [Java.use("android.accounts.AccountManagerCallback")],
                methods: {
                    run: function (future) {
                        console.log("[+] Account removed via legacy method!");
                    }
                }
            });
            accountManager.removeAccount(account, callback.$new(), handler);
        }
    }

    // ✅ Step 1: Remove if already exists
    const accounts = accountManager.getAccountsByType(accountType);
    if (accounts.length > 0) {
        console.log("[!] Existing Garena account(s) found: " + accounts.length);
        for (let i = 0; i < accounts.length; i++) {
            removeAccount(accounts[i]);
        }
    } else {
        console.log("[*] No existing Garena account found.");
    }

    // ✅ Step 2: Hook addAccountExplicitly
    AccountManager.addAccountExplicitly.overload(
        'android.accounts.Account', 'java.lang.String', 'android.os.Bundle'
    ).implementation = function (account, password, userdata) {
        const result = this.addAccountExplicitly(account, password, userdata);
        if (account.type.value === accountType) {
            console.log("[+] Garena account created: " + account.name.value);
            removeAccount(account);
        }
        return result;
    };
});
