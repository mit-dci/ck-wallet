import { AsyncStorage } from 'react-native';
import WalletRestApi from '../api/WalletRestApi';
import { genKeyPair } from '../helpers/coinHelper.js';
var CryptoJS = require('crypto-js');

var api;

export const genKey =  function(label, password) {
        var promise = new Promise(function(resolve, reject) {});

        var keypair = genKeyPair();

        var pbkdf = CryptoJS.algo.PBKDF2.create({ keySize: 8,
                                                  iterations: 1000,
                                                  hasher:
                                                  CryptoJS.algo.SHA256
                                                });

        var salt = CryptoJS.lib.WordArray.random(32);
        var encKey = pbkdf.compute(password, salt);

        var iv = CryptoJS.lib.WordArray.random(16);

        var cipherText = CryptoJS.AES.encrypt(CryptoJS.enc.Base64.parse(keypair.priv),
                                              encKey,
                                              { iv: iv });

        var keyData = {
            label: label,
            publicKey: keypair.pub,
            cipherText: CryptoJS.enc.Base64
                                .stringify(cipherText.ciphertext),
            iv: CryptoJS.enc.Base64.stringify(iv),
            salt: CryptoJS.enc.Base64.stringify(salt)
        };


        return Promise.resolve(keyData);
}

export const getNewKey = function(id, label, password, api) {
    //console.log(id, label, password, api);
    return genKey(label, password).then(function(res) {
      console.log(res);
      return api.updateKeys(id, res).then(
                function(htres) {
                    return res;
              });
    });
};
