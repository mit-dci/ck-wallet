import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button,
TouchableHighlight} from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import FORM_FIELD_BACKGROUND_COLOR from '../constants/styles';
import { onSignOut,  } from '../helpers/auth';

export default class SideBarView extends React.Component {

  navigateToScreen = (route) => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())} style={{ flex: 1, alignItems: 'center'}}>
              <Image
                style = {{ width: 38, height: 38 }} defaultSource={require('../assets/leftarrow.png')}
              />
            </TouchableHighlight>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.headerStyleText}> Menu </Text>
            </View>
            <View style={{ flex: 1}} />
          </View>
          <View style={styles.drawerItemsContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: 200, borderColor: 'white', borderBottomWidth: 0.7 }}>
              <Button
                color={'white'}
                title={"Home"}
                onPress={() =>
                  { this.props.navigation.navigate('Main');
                  this.props.navigation.dispatch(DrawerActions.closeDrawer());}}
              />
            </View>
            <View style={{ flexDirection: 'row', width: 200, borderColor: 'white', borderBottomWidth: 0.8, justifyContent:'flex-start' }}>
              <Button title={"Create Wallet"}
                color={'white'}
                onPress={() => this.props.navigation.navigate('Wallet')}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Button
                color={'white'}
                title={"Sign Out"}
                onPress={() =>
                   { onSignOut();
                  this.props.navigation.navigate("SignOut"); }}
               />
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 250,
    alignItems: 'center',
  },
  headerContainer: {
    flex: 0.2,
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  headerStyleText: {
    fontSize: 18,
    color: 'white'
  },
})
