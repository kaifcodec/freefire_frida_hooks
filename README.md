# FreeFireFrida Hooks

> ⚠️ **Disclaimer:** This repository was originally created by the owner for personal research and testing purposes. It is made public *only in case someone finds it useful.*

---

## 📘 Overview

This repository contains a collection of Frida `.js` hook scripts used during a personal project focused on analyzing and reverse-engineering aspects of the **Free Fire Max** application. The scripts are designed to hook into various Java methods for capturing:

- 🔐 `secret_key` values  
- 🧂 `salt` used in crypto operations  
- 🔑 Password generation logic  
- 📦 Encrypted payload and header construction methods  
- `important` directory is what worked for the owner to delete the app's account creation in the `/data/system_ce/android_ce.db` and removal of the account dynamically once it created.
These hooks were written and refined as part of a reverse engineering effort to understand how the app internally builds secure requests — particularly in the context of automating **guest account creation** via HTTPS requests.

---

## 🛠️ Usage

These scripts are not ready-to-use modules. If you wish to utilize them:

- Manually go through each `.js` file  
- Understand what each hook targets  
- Customize them as needed to fit your app version or use-case  

Some methods may only work on specific versions of Free Fire Max, so adaptation may be required.

> 💡 Tip: Familiarity with Frida, Java method hooking, and Android app internals is assumed.

---

## 📌 Purpose

This project was part of a self-driven investigation into:

- The app's guest login flow  
- How it generates encrypted request bodies  
- Header token/signature creation  
- Gaining deeper understanding of client-side request signing and obfuscation techniques
- How it keeps getting old guest account even after clear data and removal of the package from the root level.

All data and hooks collected were for **educational** and **non-malicious** purposes.

---

## 📄 Legal Notice

This repository is intended strictly for **educational and research purposes**.  
No guarantees are provided for the accuracy or effectiveness of the scripts.  
The owner does **not** condone any misuse, unauthorized access, or violation of terms of service of any software or platform.

> 🚨 Use at your own risk and always stay within legal and ethical boundaries.

---

## 🤝 Contribution & Contact

Contributions are not currently open, as this is a personal archive (But you can open issue).  
If these scripts help you in any way, that's great. If not, they were never meant to. 😎

---
