import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, AsyncStorage } from 'react-native';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent';
import { APP_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles.js';
import WalletRestApi from '../api/WalletRestApi';
var CryptoJS = require("crypto-js");

export default class SignInViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {token:"", user_id:"",text: "", passwordText: ""};
  }

  signInHandler() {
    const api = new WalletRestApi();

    api.login(this.state.text, this.state.passwordText)
    .then(response => { console.log(response);
      if(response.success) {
        AsyncStorage.setItem("token", response.token);
        AsyncStorage.setItem("user_id", response.user_id);
        this.props.navigation.navigate("Main");
      }
    })
    .catch(err => console.log(err));

  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}> Sign In </Text>
        <Text style={styles.descriptionStyle}> Sign In to your K320 account </Text>
        <TextInput
          style={{padding: 10, marginTop: 25, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5, color: DETAIL_TEXT_COLOR}}
          onChangeText={(text) => {this.setState({text}); }}
          value={this.state.text}
          keyboardType="numbers-and-punctuation"
          placeholder="Username"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <TextInput
        style={{padding: 10, marginTop: 15, marginBottom: 4, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5, color: DETAIL_TEXT_COLOR}}
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

        <View style={{marginTop: 50}}>
          <Text style={{color: DETAIL_TEXT_COLOR}}> Don't have an account?
           <Text> </Text>
           <Text onPress={() => this.props.navigation.navigate('Register')} style={styles.registerAcccountTextStyle}> Register </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    color: 'white',
    fontSize: 18,
    marginTop: 20
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
