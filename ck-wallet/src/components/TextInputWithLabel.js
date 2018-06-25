import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import ButtonWithImageComponent from './ButtonWithImageComponent';
import {APP_BACKGROUND_COLOR,FORM_FIELD_BACKGROUND_COLOR,DETAIL_TEXT_COLOR} from '../constants/styles.js';

export default class TextInputWithLabelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""}
  }

  render() {
    return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        placeholder={this.props.placeholder}
        placeholderTextColor={DETAIL_TEXT_COLOR}
        onChangeText={(text) => {this.props.update(text);}}
        value={this.state.text}>
      </TextInput>
      <View style={styles.textContainer}>
        <Text style={styles.text}> {this.props.labelText} </Text>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    width: 365,
    height: 46,
  },
  textInputStyle: {
    flex: 0,
    backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
    color: 'white',
    width: 306,
    height: 46,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
    width: 55,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  text: {
    color: 'white',
  }
});
