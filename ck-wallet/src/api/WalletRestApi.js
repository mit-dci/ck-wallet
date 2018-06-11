import RestClient from 'react-native-rest-client';

export default class WalletRestApi extends RestClient {
  constructor() {
    super('http://localhost:8080'); //real source will be wallet.cryptokernel.org
  }

  login(name, password) {
    //Returns a Promise with the response
    return this.POST('/api/authenticate', {"name": name, "password": password});
  }

  register(username, password) {
    return this.POST('/api/users', {"name": username, "password": password});
  }

}
