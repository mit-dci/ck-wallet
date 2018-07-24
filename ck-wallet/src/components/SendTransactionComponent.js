import React from 'react';
import {Dimensions, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import TextInputWithDetailComponent from './TextInputWithDetailComponent';
import TextInputWithLabelComponent from './TextInputWithLabel';
import ButtonWithActionComponent from './ButtonWithActionComponent';
import WalletRestApi from '../api/WalletRestApi';
import {onSignOut} from '../helpers/auth.js';

export default class SendTransactionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keys: [], user_id: "",token: "", receivingAddress: '', coinAmount: '0.00'};
    AsyncStorage.getItem('token').then((value) => this.setState({token: value}));
    AsyncStorage.getItem('user_id').then((value) => this.setState({user_id: value}));
    AsyncStorage.getItem('keys').then((value) => this.setState({keys: JSON.parse(value)}));
  }

  handleAddressChange() {
    //yet to be implemented.
  }

  handleCoinAmountChange() {
  //yet to be implemented.
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
