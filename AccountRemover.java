
import android.accounts.*;
import android.app.*;
import android.content.*;

public class AccountRemover {
    public static void main(String[] args) {
        Context context = ActivityThread.systemMain().getSystemContext();
        AccountManager am = AccountManager.get(context);

        System.out.println("== Accounts ==");
        Account[] accounts = am.getAccounts();
        for (int i = 0; i < accounts.length; i++) {
            System.out.println(i + ": " + accounts[i].name + " | " + accounts[i].type);
        }
    }
}
