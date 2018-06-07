import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SignInValidationComponent from '../components/SignInValidationComponent';
import RegisterAccountViewComponent from  './RegisterAccountComponentView';
import { APP_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles.js';

export default class SignInViewComponent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerStyle}> Sign In </Text>
        <Text style={styles.descriptionStyle}> Sign In to your K320 account </Text>
        <SignInValidationComponent />
        <View style={{marginTop: 50}}>
          <Text style={{color: DETAIL_TEXT_COLOR}}> Don't have an account?
           <Text onPress={this.props.onPressHandler} style={styles.registerAcccountTextStyle}> Register </Text>
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
    height: 350,
    width: 670,
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    color: 'white',
    fontSize: 18,
    marginTop: 20
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
