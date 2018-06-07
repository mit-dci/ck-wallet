import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SignInViewComponent  from './src/views/SignInViewComponent';
import RegisterAccountViewComponent from './src/views/RegisterAccountComponentView';
import ForgotPasswordView from './src/views/ForgotPasswordView';
import APP_BACKGROUND_COLOR from './src/constants/styles'
import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator(
  {
    Home: SignInViewComponent,
    Register: RegisterAccountViewComponent,
    ForgotPassword: ForgotPasswordView,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#49655C',
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return (<RootStack />);
  }
}
