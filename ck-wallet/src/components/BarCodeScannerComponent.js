import React from 'react';
import { StyleSheet, Text, View, Clipboard, Button } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import ButtonComponent from './ButtonComponent';

export default class BarcodeScannerComponent extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',}}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <View style={{marginBottom: 20,}}>
            <ButtonComponent onPressHandler={() => this.props.navigation.navigate("Main")} text="Go Back"/>
          </View>
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    Clipboard.setString(data);
    alert(`Public key ${data} has been copied!`);
  }
}
