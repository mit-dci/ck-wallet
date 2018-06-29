import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, DETAIL_TEXT_COLOR } from '../constants/styles.js';
import ButtonWithActionComponent from '../components/ButtonWithActionComponent';
import SendReceiverSwitchComponent from '../components/SendReceiverSwitchComponent';
import SendTransactionComponent from '../components/SendTransactionComponent';
import BalanceHeaderComponent from '../components/BalanceHeaderComponent';

export default class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {keys: [], user_id: "", token: "", receivingAddress: '', coinAmount: '0.00'};
  }
  sendHandler() {
    console.log("Send Money");
  }
  receiveHandler() {
    console.log("Receive Money");
  }

  render() {

    return (

      <View style={styles.container}>
        <View style={styles.balanceHeaderContainer}>
          <BalanceHeaderComponent />
        </View>
        <View>
          <SendReceiverSwitchComponent onPressSendHandler={this.sendHandler} onPressReceiveHandler={this.receiveHandler}/>
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
  balanceHeaderContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
  }
});
