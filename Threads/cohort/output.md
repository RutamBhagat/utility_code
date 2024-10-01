```
# Week 1.2 (Bitcoin WhitePaper)

> In this offline lecture, Harkirat taught sets the stage for the exciting world of bitcoin whitepaper by topics that will taught the way how blockchain technology came into the picture also taught us bitcoin documentation.

Official Bitcoin white paper was released in 2008 - https://bitcoin.org/bitcoin.pdf

## Introduction of Bitcoin

### Current System

1. **Trusted Third Parties:**
   - When you buy something online, a bank or a financial company (like PayPal) processes the payment.
   - These companies are trusted to handle the money and make sure everything is fair.
2. **Problems with Trust-Based Model:**
   - **Trust Issues:** You need to trust these companies with your money and personal information.
   - **Fees:** These companies charge fees for processing transactions.
   - **Fraud Risk:** There is still a risk of fraud, where someone might cheat you.

### New System Idea

1. **Cryptographic Proof:**
   - Use advanced math (cryptography) to secure transactions instead of trusting a third party.
   - Think of it as a super-secure digital signature that can’t be faked.
2. **Direct Transactions:**
   - Two people can trade directly with each other without needing a bank or company in the middle.
   - This is like giving cash directly to someone instead of going through a bank.
3. **Irreversible Transactions:**
   - Once a transaction is done, it can’t be undone (just like handing someone cash).
   - This prevents people from trying to reverse the transaction to get their money back after receiving a product or service.
4. **Buyer Protection:**
   - Special systems (like escrow) can hold the money until both sides agree the transaction is fair.
   - Escrow is like a neutral person holding onto the money until both the buyer and seller are happy with the deal.

### Example:

Imagine you want to buy a book from someone online.

**Current System:**

- You pay through PayPal.
- PayPal processes the payment and takes a fee.
- You trust PayPal to handle the transaction fairly.

**New System:**

- You pay directly using a cryptographic proof.
- The transaction is secure and can’t be reversed.
- An escrow service can hold the payment until you confirm you got the book.

### Benefits of the New System:

1. **No Middleman:**
   - No need to trust a third party with your money.
   - Fewer fees since there’s no middleman.
2. **Security:**
   - Cryptographic proof makes it very secure.
   - Harder for fraud to occur.
3. **Direct Control:**
   - You deal directly with the person you’re buying from.
   - You have more control over the transaction.

This new system aims to make online transactions more secure, direct, and fair, reducing the need for trusted third parties like banks or financial companies.

## Digital Signatures and Ownership

Imagine passing a special note (digital coin) from one person to another, and each person signs the note to show they owned it. This way, we can always know who the current owner is by looking at the signatures.

### Step-by-Step Explanation

1. **Owner 0 (First Owner) -> Owner 1:**
   - **Owner 0** writes down their name on the note.
   - They also write down **Owner 1's name**.
   - Then, they sign it with their secret signature (private key).
   - This signed note can be checked by anyone using **Owner 0's public key** to confirm that it was indeed signed by Owner 0.
2. **Owner 1 -> Owner 2:**
   - **Owner 1** takes the note they got from Owner 0.
   - They write down their name and **Owner 2's name** on the note.
   - Then, they sign it with their own secret signature (private key).
   - This signed note can be checked by anyone using **Owner 1's public key** to confirm that it was indeed signed by Owner 1.
3. **Owner 2 -> Owner 3:**
   - **Owner 2** takes the note they got from Owner 1.
   - They write down their name and **Owner 3's name** on the note.
   - Then, they sign it with their own secret signature (private key).
   - This signed note can be checked by anyone using **Owner 2's public key** to confirm that it was indeed signed by Owner 2.

### Visualising the Process

1. **First Transaction (Owner 0 to Owner 1):**
   - **Owner 0 writes:** "I give this coin to Owner 1."
   - **Owner 0 signs:** "Owner 0's signature."
2. **Second Transaction (Owner 1 to Owner 2):**
   - **Owner 1 writes:** "I give this coin to Owner 2."
   - **Owner 1 signs:** "Owner 1's signature."
3. **Third Transaction (Owner 2 to Owner 3):**
   - **Owner 2 writes:** "I give this coin to Owner 3."
   - **Owner 2 signs:** "Owner 2's signature."

### How We Verify Ownership

- To check who currently owns the coin, we look at the note:
  - **Owner 3's name** is the last one written.
  - We can follow the signatures back to see that each previous owner signed off correctly.

### Summary

- Each person who gets the coin signs it to prove they owned it.
- These signatures can be verified to ensure they are real.
- The chain of signatures shows the history of **ownership**, so we know who owns it now.

By using this method, we don't need a middleman (like a bank) to verify the transactions. The signatures and public keys do all the verification for us, ensuring secure and direct transactions between people.

### Question:

I buy service from someone instead of someone i use this method and pay him so they get direct money before service or after service if after then how they know they are paid anyone can lie

### Answer

Great question! Let's address this step by step.

### Scenario: Buying a Service Directly

1. **Current Traditional Method:**
   - You use a trusted third party (like a bank or payment service) to pay someone for a service.
   - The third party processes the payment and ensures the seller gets the money.
2. **Proposed Cryptographic Method:**
   - You use a system of digital signatures and public/private keys to transfer a digital coin (like Bitcoin) directly to the service provider.

### How It Works in the Cryptographic Method

### Before the Service is Provided:

- **You pay directly:**
  - You transfer the digital coin to the service provider.
  - This transaction is signed with your private key and can be verified with your public key.
  - The service provider can check the blockchain (or the transaction record) to see that they have received the digital coin.

### After the Service is Provided:

- **You pay after service:**
  - The service provider completes the service.
  - You then transfer the digital coin using your private key.
  - The service provider verifies the transaction to ensure they have received the payment.

### Ensuring Trust and Preventing Lies

To prevent lying and ensure both parties are honest, additional mechanisms can be used:

1. **Escrow Service:**
   - An escrow service holds the payment until both parties confirm the transaction is complete.
   - The buyer sends the digital coin to the escrow account.
   - Once the service is provided, the buyer confirms they are satisfied.
   - The escrow releases the payment to the service provider.
2. **Smart Contracts:**
   - A smart contract is a program that automatically executes the terms of the agreement.
   - For example, you create a smart contract that releases payment once the service is marked as completed.
   - Both parties agree to the terms coded into the smart contract, ensuring the payment only happens under specific conditions.

### Example Using Escrow

1. **Agreement:**
   - You and the service provider agree on the terms.
   - You send the payment to an escrow service.
2. **Service Provided:**
   - The service provider completes the service.
3. **Confirmation:**
   - You confirm you are satisfied with the service.
   - The escrow service releases the payment to the service provider.

### Example Using Smart Contract

1. **Agreement:**
   - You create a smart contract with the terms of the service.
   - The contract holds the payment and specifies conditions for release.
2. **Service Provided:**
   - The service provider completes the service and marks it as done in the contract.
3. **Automatic Release:**
   - The smart contract automatically checks the condition (service completed) and releases the payment to the provider.

### Summary

- Without a third party, you can use cryptographic methods to pay directly.
- To ensure trust, you can use escrow services or smart contracts.
- These mechanisms ensure that the service provider gets paid only after the service is completed and verified.

This way, both the buyer and the seller are protected, and the transaction remains secure and trustworthy.

## The Problem: Double-Spending

### Scenario: Sharing a Digital Book

### Problem of Double-Spending

Imagine you have a digital book file. If you email it to a friend, you still have the original file. Now both you and your friend have a copy. This is double-spending in the digital world.

### Traditional Solution: Central Authority

1. **Library System (Mint):**

   - You borrow a book from a central library.
   - You must return the book to the library before someone else can borrow it.
   - The library ensures that only one person has the book at a time.

   **Problems:**

   - The library controls everything (centralized).
   - If the library makes a mistake or shuts down, the system fails.

### Decentralised Solution: Blockchain

1. **Blockchain Library:**
   - Every person in a group keeps a record (ledger) of who has the book.
   - When you want to give the book to a friend, you announce it to everyone in the group.
2. **Verification:**
   - Everyone checks their records to make sure you haven't already given the book to someone else.
   - If most people agree (consensus), they update their records to show your friend now has the book.
3. **Adding to the Record:**
   - This updated record (transaction) is added to a chain of records (blockchain) that everyone has a copy of.
   - Once added, the record can't be changed, ensuring transparency and security.

### Real-Life Example:

1. **You have a unique digital book.**
2. **You want to give it to Alice.**
   - You tell everyone (network) that you’re giving the book to Alice.
3. **Everyone checks:**
   - They confirm you haven't given it to anyone else before.
4. **Consensus:**
   - Everyone agrees and updates their records to show Alice has the book.
5. **Alice now has the book:**
   - This is recorded in a way that can't be changed, ensuring everyone knows Alice has the book and it wasn't given to anyone else.

### Summary

- Instead of relying on a single library (central authority), you rely on everyone in the group (decentralized network) to keep and verify records.
- This way, double-spending is prevented, and trust is maintained without a central authority.

This is how blockchain technology ensures secure and transparent transactions without the need for a central authority.

```

```
👨‍💻 [infer topic from info] 🌐 ⤵️
[Insert info of what we learned from the class here]

𝗪𝗲𝗲𝗸 1.2: Bitcoin WhitePaper
In this week, we explored [brief description] with @kirat_tw #100xDevs
(A thread 🧵)….

𝗞𝗲𝘆 𝗧𝗮𝗸𝗲𝗮𝘄𝗮𝘆𝘀 ✍🏻:
⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺
・[List of Topics]

🔑 [Takeaway No. Title]
[Explanation of Takeaway No. in 250-280 characters]

My name is Rutam and I talk about
Web3, AI and WebDev.
Let's Connect 🤝

```
