import RestClient from 'react-native-rest-client';
var CryptoJS = require('crypto-js');

export default class WalletRestApi extends RestClient {
  constructor(authToken) {
    super('http://35.185.49.128:8080', {
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

  makeKey(user_id) {
    return this.GET('/api/users/'+user_id+"/keys");
  }


}
