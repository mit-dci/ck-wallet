import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, TouchableHighlight } from 'react-native';
import { APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles';
import TextInputWithLabelComponent from '../components/TextInputWithLabel';
import BalanceHeaderComponent from '../components/BalanceHeaderComponent';

export default class HeaderComponent extends React.Component {

  render() {
    const rightHeaderView = this.props.showBalance  ?
    (<BalanceHeaderComponent />) : null;

    return (
      <View style={styles.container}>
        <View style={styles.leftHeaderContainer}>
          <TouchableHighlight underlayColor={"transparent"}
            onPress={this.props.onPressHandler}>
            <Image
              style={{ width: 35, height: 35 }}
              defaultSource={this.props.source}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleTextStyle}> {this.props.title} </Text>
        </View>
        <View style={styles.rightContainer}>
          {rightHeaderView}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 30,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: APP_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 2,
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    color: 'white',
    fontSize: 18,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 10,
  },
})
