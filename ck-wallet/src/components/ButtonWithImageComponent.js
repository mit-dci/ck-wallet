import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableHighlight, Image} from 'react-native';
import { BUTTON_BACKGROUND_COLOR } from "../constants/styles.js";

export default class ButtonWithImageComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(<View>
      <TouchableHighlight underlayColor={"transparent"} onPress={this.props.onPressHandler}>
        <View style={styles.container}>
          <Image
            style={{width: this.props.width, height: this.props.height}}
            resizeMethod={"resize"}
            defaultSource={this.props.source}>
          </Image>
        </View>
      </TouchableHighlight>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    width: 55,
    height: 46,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    justifyContent: 'center',
  },
});
