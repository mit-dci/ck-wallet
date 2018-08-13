import RestClient from 'react-native-rest-client';
var CryptoJS = require('crypto-js');


export default class WalletRestApi extends RestClient {
  constructor(authToken) {
    super('http://35.227.19.97:8080', {
      headers: {
        'x-access-token': authToken,
      },
    }); //real source will be wallet.cryptokernel.org
  }

  login(name, password) {
    //Returns a Promise with the response
    return this.POST('/api/authenticate', {"name": name, "password": CryptoJS.SHA3(password).toString()});
  }

  register(username, password) {
    return this.POST('/api/users', {"name": username, "password": CryptoJS.SHA3(password).toString()});
  }

  getKeys(user_id) {
    return this.GET('/api/users/'+user_id+"/keys");
  }

  updateKeys(user_id, res) {
    return this.POST('/api/users/'+user_id+"/keys", res);
  }

  getTxos(publicKey) {
    return this.POST('/api/blockchain/txos', {"pubkey": publicKey});
  }

  getTransaction(id) {
    return this.POST('/api/blockchain/util/gettransaction', {"id": id});
  }

  postOutputs(outputs) {
    return this.POST('/api/blockchain/util/getoutputsetid', {"outputs": outputs});
  }

  sendRawTransaction(tx) {
    return this.POST('/api/blockchain/util/sendrawtransaction', {'tx': tx});
  }

}
