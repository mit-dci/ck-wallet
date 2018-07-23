import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, AsyncStorage, StatusBar,
Image} from 'react-native';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent';
import { APP_BACKGROUND_COLOR,
  DETAIL_TEXT_COLOR,
  FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles.js';
import WalletRestApi from '../api/WalletRestApi';
import {onSignIn} from '../helpers/auth';
var CryptoJS = require("crypto-js");

export default class SignInViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {token:"", user_id:"", text: "", passwordText: "", balance: 0};
  }

  signInHandler() {
    const api = new WalletRestApi();
    var user_id;

    api.login(this.state.text, this.state.passwordText)
    .then(response => {
      if(response.success) {
        AsyncStorage.setItem("token", response.token);
        AsyncStorage.setItem("user_id", response.user_id);
        this.retrieveKeys(response.user_id, response.token);
        onSignIn().then(() => this.props.navigation.navigate("Main"));
      }
    })
    .catch(err => console.log(err));

  }

  retrieveKeys(user_id, token) {
    const api = new WalletRestApi(token);
    api.getKeys(user_id)
    .then(response => {
      AsyncStorage.setItem("labelAndKeys", JSON.stringify(response.keys));
      var publickeys = [];
      const keys = response.keys;
      for (var counter=0; counter < keys.length; counter++) {
        publickeys[counter] = keys[counter].publicKey;
      }
      AsyncStorage.setItem("keys", JSON.stringify(publickeys));
      this.getBalance(publickeys, token, api);
    })
    .then(response => response)
    .catch(err => console.log(err));
  }

  async getBalance(publickeys, token, api) {
      var outputs = [];
      var balance = 0;
      for(var j=0; j < publickeys.length; j++) {
        api.getTxos(publickeys[j])
        .then(response => {
          //console.log(response);
          if(response.txos === null) {
            //do nothing
          } else {
            for(output = 0; output < response.txos.length; output++) {
                var txo = response.txos[output];
                outputs.push(txo);
                if(txo.spent == false) {
                  balance += txo.value;
              }
            }
          }

          AsyncStorage.setItem("balance", JSON.stringify(parseFloat(balance / 100000000.0)));
          AsyncStorage.setItem("outputs", JSON.stringify(outputs));
        })
        .catch(err => console.log(err));
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <Image style={styles.headerStyle} defaultSource={require('../assets/cryptokernel_1_trnsprntbg.png')} />
        <Text style={styles.descriptionStyle}> Sign in to your Cryptokernel account </Text>
        <TextInput
          style={{padding: 10, marginTop: 25, height: 40, width: 275,
            backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
            borderRadius: 5,
            color: DETAIL_TEXT_COLOR}}
          onChangeText={(text) => {this.setState({text}); }}
          value={this.state.text}
          keyboardType="numbers-and-punctuation"
          placeholder="Username"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <TextInput
          style={{padding: 10, marginTop: 15,
             marginBottom: 4, height: 40, width: 275,
             backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
            borderRadius: 5, color: DETAIL_TEXT_COLOR}}
          onChangeText={(passwordText) => this.setState({passwordText: passwordText})}
          keyboardType="numbers-and-punctuation"
          secureTextEntry
          placeholder="Your Password"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <View style={styles.forgotPasswordContainer}>
          <Text onPress={() => this.props.navigation.navigate("ForgotPassword")} style={{color: DETAIL_TEXT_COLOR, marginBottom: 20}}> Forgot Password? </Text>
        </View>

        <ButtonWithActionComponent onPressHandler={() => { this.signInHandler()}} text="Sign In" source={require('../assets/right_arrow_3.png')}/>

        <View style={{marginTop: 50, flexDirection: 'row'}} >
          <Text style={{color: DETAIL_TEXT_COLOR}}> Don't have an account? </Text>
          <Text onPress={() => this.props.navigation.navigate('Register')} style={styles.registerAcccountTextStyle}> Register </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  forgotPasswordContainer: {
    flex: 0,
    width: 275,
    alignItems: 'flex-end',
  },
  descriptionStyle: {
    color: 'white',
    marginTop: 20,
  },
  registerAcccountTextStyle: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
