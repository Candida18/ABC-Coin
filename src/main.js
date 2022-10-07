'use strict';
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate(
  'fc07becb342e2c07f89d4d8327be1420c3faa7ec2097f74d4f2e8ca7a127258a'
);
// private key - 7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf
// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const abcCoin = new Blockchain();

// Mine first block
abcCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
abcCoin.addTransaction(tx1);

// Mine block
abcCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
abcCoin.addTransaction(tx2);

// Mine block
abcCoin.minePendingTransactions(myWalletAddress);

console.log();

console.log(
  `Balance of Candida is ${abcCoin.getBalanceOfAddress(myWalletAddress)}`
);



// Uncomment this line if you want to test tampering with the chain
//abcCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log(JSON.stringify(abcCoin, null, 4));
console.log('Blockchain valid?', abcCoin.isChainValid() ? 'Yes' : 'No');
