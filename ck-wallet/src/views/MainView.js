import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles.js';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent';
import SendReceiverSwitchComponent from '../components/SendReceiverSwitchComponent';
import SendTransactionComponent from '../components/SendTransactionComponent';

export default class MainView extends React.Component {

  constructor(props) {
    super(props);

  }
  sendHandler() {
    console.log("Send Money");
  }

  sendHandler() {
    console.log("Receive Money");
  }

  render() {
    return (

      <View style={styles.container}>
        <View>
          <SendReceiverSwitchComponent onPressSendHandler={this.sendHandler} onPressReceiveHandler={this.sendHandler}/>
        </View>
        <SendTransactionComponent />


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
  },
});
