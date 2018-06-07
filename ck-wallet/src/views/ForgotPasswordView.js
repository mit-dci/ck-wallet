import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import ButtonComponent from '../components/ButtonComponent'
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles.js'

export default class ForgotPasswordView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 18, marginTop: 20 }}> Forgot Password </Text>
        <Text style={{color: 'white', marginTop: 40}}> Input the email associated with your account. </Text>
        <TextInput
          style={{textAlign: 'left', marginTop: 75, marginBottom: 70, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5}}
          placeholder="example@example.com"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <ButtonComponent text="Send Recovery Email" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: 'center',

  },
});
