import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import SignInView from '../views/SignInView';
import MainView from '../views/MainView';
import RegisterView from '../views/RegisterAccountView';
import SidebarView from '../views/SidebarView';
import WalletView from '../views/CreateWalletView';
import BarCodeScannerComponent from '../components/BarCodeScannerComponent';
import FORM_FIELD_BACKGROUND_COLOR from '../constants/styles';

export const Drawer = createDrawerNavigator({
   Main: {
     screen: MainView,
   },
   Wallet: {
     screen: WalletView,
     navigationOptions: {
       header: null,
     }
   },
   SignOut: {
     screen: SignInView,
   }
}, {
  contentComponent: SidebarView,
  drawerWidth: 250,
  drawerPosition: 'left',
  drawerBackgroundColor: 'black',
});

export const SignedIn = createStackNavigator({
  Main: {
    screen: Drawer,
    navigationOptions: {
      header: null,
    }
  },
  Camera: {
    screen: BarCodeScannerComponent,
    navigationOptions: {
      header: null,
    }
  },
  initialRouteName: 'Main',
});

export const SignedOut = createStackNavigator({
  Profile: {
    screen: SignInView,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: SignedIn,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterView,
    navigationOptions: {
      header: null,
    },
  },
  initialRouteName: 'Profile',
});
