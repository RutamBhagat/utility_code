# Week 2.1

> In this lecture Harkirat taught, the difference between centralized banks and decentralized blockchains, the basics of bits and bytes, how encodings like ASCII and UTF-8 format data, the distinction between irreversible hashing and reversible encryption, the role of asymmetric encryption with public/private keypairs for secure communication, and how to generate these keypairs for safe data exchanges.
> 

## How banks do Authentication

Imagine walking into a bank to withdraw money. The bank verifies your identity in two main ways: something you know (like a PIN or password), something you have (like a bank card/username). This is called authentication. For instance, when you use an ATM, you insert your card (something you have) and enter your PIN (something you know),to ensure it’s really you. 

### Current Scenario

In traditional banks, you have a `username` and `password` that are enough for you to

1. Look at your funds
2. Transfer funds
3. Look at your existing transactions

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/79678183-8eb4-4d85-8deb-a5a9b5f17a7d/64d8354c-f656-4d1c-abf3-c442d8dba998/image.png)

## **How Blockchains do authentication**

Blockchains authenticate users differently from traditional banks. Instead of usernames and passwords, blockchain systems use cryptographic keys. When you create a blockchain wallet, you get a public key (like an address that others can see) and a private key (a secret that only you know). To perform any transaction, you must sign it with your private key, which proves it's really you. This process is secure because only someone with the private key can authorize transactions, ensuring that no one else can access your funds or data without it.”

### Current Scenario

If you ever want to create an `account` on a blockchain, you need to generate a `public-private` keypair.

## **Public private Keypair**

A public-private key pair is a set of two keys used in `asymmetric cryptography`. These two keys have the following characteristics:

### Public Key

Imagine your public key is like your home address. You can share it with anyone, and they can send you letters (or in the case of blockchain, cryptocurrencies). However, just knowing your address doesn't let them open your mailbox. The mailbox key, which only you have, is like your private key. It allows you to access what's inside. So, the public key lets people know where to send things, but only your private key lets you actually receive and access them.

**In terms of blockchain there is some address of each user, in simple the public key is a string that can be shared openly.**

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/79678183-8eb4-4d85-8deb-a5a9b5f17a7d/5be3663a-c26a-4961-ad6a-45543ff8bdcd/image.png)

For example - https://etherscan.io/address/0xD9a657ACB3960DB92AaaA32942019bD3c473FCCB

### Private Keys

Think of your private key like the key to your mailbox. While your public key is like your home address, which anyone can know to send you mail, the private key is what allows you to unlock the mailbox and retrieve the mail. It’s a secret key that only you have, and it’s crucial to keep it safe. If someone else gets hold of your private key, they can access everything in your mailbox (or in the blockchain world, your funds and data). So, just like you wouldn't give your mailbox key to anyone, you should never share your private key.

**In terms of blockchain the private key is a secret string that must be kept confidential**

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/79678183-8eb4-4d85-8deb-a5a9b5f17a7d/8f5a9eef-dc0d-4df3-a337-68d053872ddc/image.png)

# **Hashing vs Encryption**

## Hashing

**Hashing** is like taking a piece of data and running it through a "shredder" that turns it into a fixed-size string of characters, typically a mix of numbers and letters. The key thing about hashing is that once you shred the data, you can't put it back together—hashing is a one-way process.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/79678183-8eb4-4d85-8deb-a5a9b5f17a7d/8f40d83a-deaa-418c-af88-5351bd7efd31/image.png)

Common hashing algorithms - SHA-256, MD5

### Real-Life Example of Hashing:

**Imagine you’re baking a cake.**

- Once you’ve mixed the ingredients and baked the cake, it’s impossible to reverse the process and get back the original ingredients in their exact form.
- Similarly, when you hash a password, you convert it into a scrambled string (the cake), and you can't get the original password back from it (the ingredients). However, you can always hash the same password and compare it to the stored hash to see if they match, just like tasting a cake and recognizing the flavor.

### Use Case:

- **Password Storage**: When you create a password for an online account, it is hashed before being stored. When you log in, the password you enter is hashed again, and the two hashes are compared to verify your identity.

## Encryption

**Encryption** is like locking your data in a box with a key. It transforms data into a scrambled format, but unlike hashing, it’s a two-way process. You can use a key to lock (encrypt) the data, and the same or a different key to unlock (decrypt) it.

**Imagine you’re sending a secret letter.**

- You write the letter (your data) and put it in a locked box (encryption). You give the key to the person you want to read it.
- They use the key to unlock the box (decryption) and read the letter. If anyone intercepts the box without the key, they can’t read the letter—it just looks like gibberish to them.

### Use Case:

- **Secure Communication**: When you send a message over a secure channel, it is encrypted. Only the intended recipient, who has the decryption key, can read the original message. For example, when you use a messaging app, your messages are encrypted so that only the recipient can decrypt and read them.

### Summary:

- **Hashing** is like turning ingredients into a cake—once it’s done, you can’t get the original ingredients back, but you can recognize the taste.
- **Encryption** is like locking a secret letter in a box—you can unlock and read it only if you have the right key.

## Symmetric Encryption vs Asymmetric Encryption

### What is Symmetric Encryption?

**Symmetric encryption** uses the same key for both encrypting and decrypting data. It’s like using a single key to both lock and unlock a door.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/79678183-8eb4-4d85-8deb-a5a9b5f17a7d/a3abc31b-5f3d-4ea6-9e84-e07755e6e835/image.png)

### Real-Life Example of Symmetric Encryption:

**Imagine a diary with a lock.**

- You write your secrets in the diary and lock it with a key (encryption).
- When you want to read your secrets again, you use the same key to unlock the diary (decryption).
- If someone else gets hold of your key, they can open the diary and read your secrets.

### Use Case:

- **File Encryption**: When you encrypt a file on your computer using symmetric encryption, the same password (key) you used to lock the file is required to unlock it.

### What is Asymmetric Encryption?

**Asymmetric encryption** uses two different keys: a public key for encryption and a private key for decryption. The keys are mathematically related, but what one key locks (encrypts), only the other key can unlock (decrypt).

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/79678183-8eb4-4d85-8deb-a5a9b5f17a7d/a3791da0-063b-4f37-becb-2568fa65a85e/image.png)

### Real-Life Example of Asymmetric Encryption:

**Imagine a mailbox with two keys.**

- The **public key** is like the key everyone can use to open the mail slot and drop letters into your mailbox (encryption). This key is available to anyone.
- The **private key** is like the key that only you have, which can open the mailbox and retrieve the letters (decryption). Even though everyone can put letters in, only you can take them out.

### Use Case:

- **Secure Email**: When someone wants to send you a secure email, they use your public key(your mail address) to encrypt the message. Only you, with your private key, can decrypt and read the email.

### Summary:

- **Symmetric Encryption** is like using a single key to lock and unlock a diary. It's simple and fast, but you must protect the key since anyone with it can access the diary.
- **Asymmetric Encryption** is like a mailbox where anyone can drop in letters using a public key, but only you can open the mailbox with your private key. It's more secure because the private key is never shared, but it's also a bit more complex and slower.