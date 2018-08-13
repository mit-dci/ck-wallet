import React from 'react';
import {Dimensions, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import TextInputWithDetailComponent from './TextInputWithDetailComponent';
import TextInputWithLabelComponent from './TextInputWithLabel';
import ButtonWithActionComponent from './ButtonWithActionComponent';
import WalletRestApi from '../api/WalletRestApi';
var CryptoJS = require('crypto-js');
import { onSignOut } from '../helpers/auth.js';
import { sendToAddress } from '../helpers/coinHelper.js';
import { getUtxos, getNewKey } from '../helpers/blockchainHelper.js';

export default class SendTransactionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      txos: [],
      user_id: "",
      token: "",
      password: "",
      receivingAddress: '',
      coinAmount: '0.00',
    };
    AsyncStorage.getItem('token').then((value) => this.setState({token: value}));
    AsyncStorage.getItem('user_id').then((value) => this.setState({user_id: value}));
    AsyncStorage.getItem('password').then((value) => this.setState({ password: value }));
    AsyncStorage.getItem('keys').then((value) => this.setState({keys: JSON.parse(value)}));
  }

  async sendMoney() {
    var api = new WalletRestApi(this.state.token);
    var receivingAddress = this.state.receivingAddress;
    var amount = this.state.coinAmount;
    var keysCollection = await api.getKeys(this.state.user_id);
    var password = this.state.password;

    var changeAddr = await getNewKey(this.state.user_id, "change " + Date.now(),
      this.state.password, api);
    var callback = function() {
      console.log("Sent!")
    }

    api.getKeys(this.state.user_id).then((keysObject) => {
        let outputs = [];
        let ended = keysObject.keys.length;

        for(let i = 0; i < keysObject.keys.length; i++) {
          api.getTxos(keysObject.keys[i].publicKey).then(function(res) {
              if(res.txos) {
                  for(var j = 0; j < res.txos.length; j++) {
                      if(!res.txos[j].spent) {
                          outputs.push(res.txos[j]);
                      }
                  }
              }

              ended -= 1;

              if(ended == 0) {
                return Promise.resolve(JSON.stringify(outputs));
              }
          })
          .then((value) => {
            if (!(value == undefined )) {
                sendToAddress(
                  receivingAddress,
                  (parseFloat(amount) * 100000000),
                  JSON.parse(value),
                  changeAddr.publicKey,
                  keysCollection,
                  callback,
                  api,
                  password);
            }
          })
          .catch((err) => err);
    }
  });

 }

    updateReceivingAddress = (value)  => {
      this.setState({receivingAddress: value});
      console.log(this.state.receivingAddress);
    }

    update = (value)  => {
      this.setState({coinAmount: value});
      console.log(this.state.coinAmount);
    }



  render() {
    return (
      <View styles={styles.container}>
        <View style={{marginTop: 10}}>
          <TextInputWithDetailComponent
            placeholder="Receiving Address"
            buttonImageSource={require('../assets/qrcode1.png')}
            onPressHandler={this.props.onPressBarHandler}
            update={val => this.updateReceivingAddress(val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <TextInputWithLabelComponent
            placeholder={"Amount"}
            labelText={"K320"}
            update={val => this.update(val)}
          />
        </View>
        <View style={{flex: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{margin: 10, color: 'white'}}> You are sending {this.state.coinAmount} K320 from your Wallet. </Text>
          <ButtonWithActionComponent
            text={"Send"}
            onPressHandler={() => { this.sendMoney() }}
            source={require("../assets/right_arrow_3.png")}
          />
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
