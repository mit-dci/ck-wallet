import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent';
import { APP_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles.js';

export default class SignInViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { emailText: '', passwordText: '' };
  }

  signInHandler() {
    console.log("What")
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}> Sign In </Text>
        <Text style={styles.descriptionStyle}> Sign In to your K320 account </Text>
        <TextInput
          style={{marginTop: 25, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5, color: DETAIL_TEXT_COLOR}}
          onChangeText={(emailText) => this.setState({emailText})}
          value={this.state.emailText}
          placeholder="example@example.com"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <TextInput
        style={{marginTop: 15, marginBottom: 4, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5, color: DETAIL_TEXT_COLOR}}
        onChangeText={(passwordText) => this.setState({passwordText})}
        value={this.state.passwordText}
        secureTextEntry
        placeholder="your password"
        placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <View style={styles.forgotPasswordContainer}>
          <Text onPress={() => this.props.navigation.navigate("ForgotPassword")} style={{color: DETAIL_TEXT_COLOR, marginBottom: 20}}> Forgot Password? </Text>
        </View>

        <ButtonWithActionComponent onPressHandler={this.signInHandler} text="Sign In" source={require('../assets/right_arrow_3.png')}/>

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
