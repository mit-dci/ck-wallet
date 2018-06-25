import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SignInView  from './src/views/SignInView';
import RegisterAccountView from './src/views/RegisterAccountView';
import ForgotPasswordView from './src/views/ForgotPasswordView';
import MainView from './src/views/MainView';
import APP_BACKGROUND_COLOR from './src/constants/styles'
import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator(
  {
    Home: SignInView,
    Register: RegisterAccountView,
    ForgotPassword: ForgotPasswordView,
    Main: MainView,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#49655C',
        borderBottomColor: "#49655C",
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return (<RootStack />);
  }
}
