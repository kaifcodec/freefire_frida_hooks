import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.Context;
import android.app.ActivityThread;

import java.util.Scanner;

public class AccountRemover {
    public static void main(String[] args) {
        Context context = ActivityThread.systemMain().getSystemContext();
        AccountManager am = AccountManager.get(context);
        Account[] accounts = am.getAccounts();

        System.out.println("== Available Accounts ==");
        for (int i = 0; i < accounts.length; i++) {
            System.out.println(i + ": " + accounts[i].name + " | " + accounts[i].type);
        }

        if (accounts.length == 0) {
            System.out.println("No accounts found.");
            return;
        }

        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the number of the account to remove: ");

        int index = -1;
        try {
            index = Integer.parseInt(scanner.nextLine());
        } catch (Exception e) {
            System.out.println("Invalid input.");
            return;
        }

        if (index >= 0 && index < accounts.length) {
            Account selected = accounts[index];
            boolean result = am.removeAccountExplicitly(selected);
            System.out.println("Removed: " + selected.name + " | Success: " + result);
        } else {
            System.out.println("Invalid account number.");
        }
    }
}
