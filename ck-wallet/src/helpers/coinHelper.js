import { AsyncStorage } from 'react-native';
var CryptoJS = require('crypto-js');
var base64js = require('base64-js');
var elliptic = require('elliptic');
var ec = new elliptic.ec('secp256k1');
import WalletRestApi from '../api/WalletRestApi';


function wordToByteArray(wordArray) {
    var byteArray = [], word, i, j;
    for (i = 0; i < wordArray.length; ++i) {
        word = wordArray[i];
        for (j = 3; j >= 0; --j) {
            byteArray.push((word >> 8 * j) & 0xFF);
        }
    }
    return byteArray;
}


function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

function byteArrayToString(byteArray) {
    var str = "", i;
    for (i = 0; i < byteArray.length; ++i) {
        str += escape(String.fromCharCode(byteArray[i]));
    }
    return str;
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return Btoa(binary);
}

function decryptKey(key, password) {
    var pbkdf = CryptoJS.algo.PBKDF2.create({ keySize: 8,
                                              iterations: 1000,
                                              hasher:
                                              CryptoJS.algo.SHA256
                                            });

    var encKey = pbkdf.compute(password,
                               CryptoJS.enc.Base64.parse(key.salt));

    var privKey = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(key.cipherText)}),
        encKey,
        { iv: CryptoJS.enc.Base64.parse(key.iv) });

    console.log(privKey);

    return privKey;
};

export const genKeyPair = function() {

      var randString = CryptoJS.lib.WordArray.random(32).toString();

      var key = ec.genKeyPair({ entropy: randString });

      // Pubkey in form z||x||y where z is 0x04
      var pubPoint = key.getPublic().encode();

      var base64PubPoint = base64js.fromByteArray(pubPoint);

      var privateKey = key.getPrivate().toArray();
      var base64PrivateKey = base64js.fromByteArray(privateKey);

      var keypair = {
          pub: base64PubPoint,
          priv: base64PrivateKey
      };

      return keypair;
};

function pubKeyToAddress(pubkey) {
    return pubkey;
};

export const sendToAddress = async function(address, amount, utxos, changeAddr, keysCollection, callback, api, password) {

        //console.log(address, amount, utxos, changAddr, keys);
        //console.log("Trying to Send Money!");

        // Build transaction

        var byteAddr = base64js.toByteArray(address);

        var pub = {x: byteAddr.slice(1, 33), y: byteAddr.slice(33)};

        var key = ec.keyFromPublic(pub);

        var keys = keysCollection.keys;

        var toSpend = [];
        var accumulator = 0;
        var fee = 15000;

        //console.log('Start looping through utxos');

        for(var i in utxos) {
            if(accumulator < amount + fee) {
                if(!utxos[i].contract) {
                    fee += JSON.stringify(utxos[i]).length * 100;
                    accumulator += utxos[i].value;
                    toSpend.push(utxos[i]);
                }
            } else {
                break;
            }
        }

        //console.log('Finish looping through utxos');

        if(accumulator < amount + fee) {
            callback("Insufficient funds when " + (fee / 100000000.0).toString()
                   + " fee included", null);
            return;
        }

        //console.log('Accumulating');

        var outputs = [];

        if(accumulator - amount - fee > 0) {
            outputs.push({
                data: {
                    publicKey: changeAddr
                },
                nonce: Math.floor((Math.random() * 100000000) + 1),
                value: accumulator - amount - fee
            });
        }

        //console.log('Finished Accumulation');

        outputs.push({
            data: {
                publicKey: address,
            },
            nonce: Math.floor((Math.random() * 100000000) + 1),
            value: amount
        });

        // var decryptKey = this.decryptKey;
        // var ec = this.ec;

        //console.log("about to post outputs");

        api.postOutputs(outputs)
        .then(function(res) {
            console.log(res);
            if(!res.success) {
                callback(res.message, null);
                return;
            }

            var outputSetId = res.id;

            var decKeys = {};

            var inputs = [];

            // Sign
            for(var i in toSpend) {
                if(!(toSpend[i].data.publicKey in decKeys)) {
                    for(var j in keys) {
                        if(keys[j].publicKey === toSpend[i].data.publicKey) {
                            console.log("PASSWORD", password);
                            decKeys[toSpend[i].data.publicKey] = base64js.toByteArray(
                            CryptoJS.enc.Base64.stringify(
                            decryptKey(keys[j], password)
                            ));

                            // var privKey = decryptKey(keys[j], 'hoopman1');
                            //
                            // var ecKey = ec.keyFromPrivate(wordToByteArray(privKey.words));
                            //
                            // var pubKey = ecKey.getPublic().encode();
                            // var base64PubPoint = base64js.fromByteArray(pubKey);
                            //
                            // console.log("we think " +  keys[j].publicKey + " equals " + base64PubPoint);
                            //
                            // var byteArray = wordToByteArray(privKey.words);
                            // console.log("byteArray", byteArray);
                            // //var arrayBuffer = new Uint16Array(byteArray).buffer;
                            // var str = base64js.fromByteArray(byteArray);
                            //
                            // decKeys[toSpend[i].data.publicKey] = base64js.toByteArray(str);
                            break;
                        }
                    }
                }

                var ecKey = ec.keyFromPrivate(decKeys[toSpend[i].data.publicKey]);

                var pubKey = ecKey.getPublic().encode();
                var base64PubPoint = base64js.fromByteArray(pubKey);

                console.log("signing " +  toSpend[i].data.publicKey + " with " + base64PubPoint);

                var toSign = base64js.toByteArray(
                            CryptoJS.enc.Base64.stringify(
                            CryptoJS.enc.Utf8.parse(
                            CryptoJS.SHA256(toSpend[i].id + outputSetId).toString())));

                var sig = ecKey.sign(toSign).toDER();

                console.log("OUTPUTS", toSpend[i].id + outputSetId.toString());

                console.log(base64js.fromByteArray(sig));

                inputs.push({
                    outputId: toSpend[i].id,
                    data: {
                        signature: base64js.fromByteArray(sig)
                    },
                });
            }

            var tx = {
                inputs: inputs,
                outputs: outputs,
                timestamp: Math.round((new Date()).getTime() / 1000)
            };

            console.log(tx);

            // Broadcast

            api.sendRawTransaction(tx)
            .then(function(res) {
                console.log("Sent!")
            });
        });
    };
