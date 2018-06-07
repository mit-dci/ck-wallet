import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent'
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles.js'

export default class RegisterAccountViewComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 18, marginTop: 20}}> Register </Text>
        <Text style={{color: 'white', marginTop: 20}}> Register to create a CK account </Text>
        <TextInput
          style={{marginTop: 25, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5}}
          placeholder="example@example.com"
          placeholderTextColor={DETAIL_TEXT_COLOR}
        />

        <TextInput
        style={{marginTop: 15, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5}}
        placeholder="Enter Password"
        placeholderTextColor={DETAIL_TEXT_COLOR}
      />

        <TextInput
        style={{marginTop: 15, marginBottom: 40, height: 40, width: 275, backgroundColor: FORM_FIELD_BACKGROUND_COLOR, borderRadius: 5}}
        placeholder="Confirm password"
        placeholderTextColor={DETAIL_TEXT_COLOR}
      />

        <ButtonWithActionComponent text="Register" source={require('../assets/right_arrow_3.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
