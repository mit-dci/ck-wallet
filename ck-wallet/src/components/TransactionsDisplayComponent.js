import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Dimensions, FlatList } from 'react-native';
import ButtonWithImageComponent from './ButtonWithImageComponent';
import SlidingDrawerComponent from './SlidingDrawerComponent';
import {APP_BACKGROUND_COLOR,FORM_FIELD_BACKGROUND_COLOR,DETAIL_TEXT_COLOR} from '../constants/styles.js';
import WalletRestApi from '../api/WalletRestApi';
import { Camera, Permissions } from 'expo';

export default class TransactionsDisplayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "", token: "", transactions: [], outputs: [], type: Camera.Constants.Type.back};
    AsyncStorage.getItem('token').then((token) => { this.getTransactions(token) } );
  }

  _keyExtractor = (item, index) => item.id;

  calculateDateFromTimestamp(timestamp) {
    return new Date(timestamp * 1000).toString();
  }

  getTransactions(token) {
    const api = new WalletRestApi(token);

    AsyncStorage.getItem('outputs')
    .then(value => {
      var outputs = JSON.parse(value);
      this.setState({ outputs: outputs });

      for(let outputCounter = 0; outputCounter < outputs.length; outputCounter++) {
        let output = outputs[outputCounter];
        let transactionId = output["creationTx"];
        let transactionObject = {};
        let finalTransactions = [];

        api.getTransaction(transactionId)
        .then((response) => {
          let transactionCopy = [...this.state.transactions];
          let transactionObject = {};
          transactionObject[transactionId] = response;
          transactionCopy.push(transactionObject);
          this.setState({ transactions: transactionCopy });
          AsyncStorage.setItem("transactions", JSON.stringify(transactionCopy));
        })
        .catch(err => console.log(err));
        AsyncStorage.getItem("transactions")
        .then((value) => { this.state.transactions = JSON.parse(value); });
      }
    });
  }

  getTransactionFromArray(txKey, txArray) {
    if(txArray == null) {
      console.log(txKey);
    }
    else {
      for(let i=0; i < txArray.length; i++) {
        if(txKey in txArray[i]) {
          return txArray[i];
        } else {
          //txKey not in array
        }
      }
    }

  }

  calculateDateForTransaction(txKey, transactions) {
    var tx = this.getTransactionFromArray(txKey, transactions);
    if(tx === undefined) {
      //
    } else {
      return this.calculateDateFromTimestamp(tx[txKey]["result"]["timestamp"]);
    }
  }

  calculateMonthForTransaction(txKey, transactions) {
    var tx = this.getTransactionFromArray(txKey, transactions);

    if(tx === undefined) {
        return "";
    } else {
      var date = this.calculateDateFromTimestamp(tx[txKey]["result"]["timestamp"]);
      var dateElements = date.split(" ");
      return dateElements[1];
    }
  }

  calculateDayForTransaction(txKey, transactions) {
    var tx = this.getTransactionFromArray(txKey, transactions);

    if(tx === undefined) {
        return "";
    } else {
      var date = this.calculateDateFromTimestamp(tx[txKey]["result"]["timestamp"]);
      var dateElements = date.split(" ");
      return dateElements[2];
    }
  }

  render() {
       return (
      <View style={styles.container}>
         <FlatList
           scrollEnabled={true}
           data={this.state.outputs}
           renderItem={({item}) =>
           <SlidingDrawerComponent
            isSpent={item.spent}
            outputValue={item.value / 100000000.0}
            transactionId={item.creationTx}
            keyExtractor={(item, index) => item.key}
          />}
         />
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
