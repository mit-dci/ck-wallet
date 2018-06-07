import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import ButtonWithActionComponent from './ButtonWithActionComponent';
import {DETAIL_TEXT_COLOR, FORM_FIELD_BACKGROUND_COLOR} from '../constants/styles'

export default class SignInValidationComponent extends React.Component {

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
        <TextInput
          style={{marginTop: 25, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5, color: DETAIL_TEXT_COLOR}}
          onChangeText={(emailText) => this.setState({emailText})}
          value={this.state.emailText}
          placeholder="example@example.com"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <TextInput
        style={{marginTop: 15, marginBottom: 40, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5, color: DETAIL_TEXT_COLOR}}
        onChangeText={(passwordText) => this.setState({passwordText})}
        value={this.state.passwordText}
        secureTextEntry
        placeholder="your password"
        placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <ButtonWithActionComponent onPressHandler={this.signInHandler} text="Sign In" source={require('../assets/right_arrow_3.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
