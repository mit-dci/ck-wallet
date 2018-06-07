import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInViewComponent from './src/views/SignInViewComponent';
import RegisterAccountViewComponent from './src/views/RegisterAccountComponentView';
import APP_BACKGROUND_COLOR from './src/constants/styles'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SignInViewComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 367,
    height: 650,
    backgroundColor: APP_BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
