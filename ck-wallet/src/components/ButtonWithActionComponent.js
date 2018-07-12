import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View, Image } from 'react-native';
import { BUTTON_BACKGROUND_COLOR } from '../constants/styles.js';

export default class ButtonWithActionComponent extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor={"transparent"} onPress={this.props.onPressHandler}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}> {this.props.text} </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={this.props.source} />
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
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    top: 7,
    left: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 75,
    height: 75,
  },
  textStyle: {
    color: 'white',
  },
});
