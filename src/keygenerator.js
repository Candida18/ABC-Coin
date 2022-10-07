'use strict';
const EC = require('elliptic').ec; // this library will allow us to generate a public and private key

// it has methods to sign something and verify a signature

// You can use any elliptic curve you want
const ec = new EC('secp256k1');
// secp256k1 is the basic algorithm for bitcoin wallets
// Generate a new key pair and convert them to hex-strings
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
console.log();
console.log(
  'Your public key (also your wallet address, freely shareable)\n',
  publicKey
);

console.log();
console.log(
  'Your private key (keep this secret! To sign transactions)\n',
  privateKey
);

