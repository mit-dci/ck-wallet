import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableHighlight, Image} from 'react-native';
import {BUTTON_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR, APP_BACKGROUND_COLOR} from "../constants/styles.js";

export default class SendReceiverSwitchComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight underlayColor={"transparent"} style={{
          flex: 1,
          height: 25,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: BUTTON_BACKGROUND_COLOR,
          borderWidth: 2,
          borderRadius: 1,
          backgroundColor: this.props.showTransactionsView ? BUTTON_BACKGROUND_COLOR : APP_BACKGROUND_COLOR }}
          onPress={this.props.onPressSendHandler}>
          <Text style={{color: this.props.showTransactionsView ? 'white' : BUTTON_BACKGROUND_COLOR}}>
            Send
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"transparent"} style={{
            flex: 1,
            height: 25,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: BUTTON_BACKGROUND_COLOR,
            borderWidth: 2,
            borderRadius: 1,
            backgroundColor: this.props.showTransactionsView ? APP_BACKGROUND_COLOR : BUTTON_BACKGROUND_COLOR}}
             onPress={this.props.onPressReceiveHandler}>
            <Text style={{color: this.props.showTransactionsView ? BUTTON_BACKGROUND_COLOR : 'white'}}>
              Receive
            </Text>
          </TouchableHighlight>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    width: 140,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BUTTON_BACKGROUND_COLOR,
    marginTop: 20,
    // borderWidth: 3,
    // borderRadius: 1,
    // marginBottom: 5,
  },
  sendContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  receiveContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,

  }
});
