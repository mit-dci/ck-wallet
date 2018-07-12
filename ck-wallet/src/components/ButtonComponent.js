import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { BUTTON_BACKGROUND_COLOR } from '../constants/styles.js';

export default class ButtonComponent extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor={"transparent"} onPress={this.props.onPressHandler}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}> {this.props.text} </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    width: 150,
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
  },
});
