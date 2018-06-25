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
        <TouchableHighlight underlayColor={"transparent"} style={{flex: 1, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: BUTTON_BACKGROUND_COLOR}} onPress={this.props.onPressSendHandler}>
          <Text style={{color: 'white'}}>
            Send
          </Text>
        </TouchableHighlight>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: APP_BACKGROUND_COLOR}}>
          <TouchableHighlight underlayColor={"transparent"} style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: APP_BACKGROUND_COLOR}}onPress={this.props.onPressReceiveHandler}>
            <Text style={{color: BUTTON_BACKGROUND_COLOR}}>
              Receive
            </Text>
          </TouchableHighlight>
        </View>
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
    borderWidth: 1,
    borderRadius: 1,
    marginBottom: 5,
  },
  sendContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: BUTTON_BACKGROUND_COLOR,
  },
  receiveContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,

  }
});
