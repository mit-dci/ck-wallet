import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Clipboard } from 'react-native';
import { APP_BACKGROUND_COLOR } from '../constants/styles';
import LabelWithActionComponent from './LabelWithActionComponent';
import QRCode from 'react-native-qrcode';

export default class QRCodeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { defaultKey: ""};
    AsyncStorage.getItem("labelAndKeys")
    .then((value) => {
      var keysAndLabels = JSON.parse(value);
      for(var i=0; i < keysAndLabels.length; i++) {
        if(keysAndLabels[i]["label"] === "default") {
          this.setState({ defaultKey: keysAndLabels[i]["publicKey"]});
        }
      }
    });
  }

  render() {
    return (
      <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <QRCode
            value={this.state.defaultKey}
            size={315}
            bgColor='black'
            fgColor='white'/>
        </View>

        <View style={{ marginTop: 30, }}>
          <LabelWithActionComponent label={this.state.defaultKey} buttonImageSource={require("../assets/copy.png")}
           onPressHandler={() => {Clipboard.setString(this.state.defaultKey)}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column",
    backgroundColor: 'white',
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },
});
