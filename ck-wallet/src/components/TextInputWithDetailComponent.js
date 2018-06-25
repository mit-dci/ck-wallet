import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import ButtonWithImageComponent from './ButtonWithImageComponent';
import {FORM_FIELD_BACKGROUND_COLOR,DETAIL_TEXT_COLOR} from '../constants/styles.js';

export default class TextInputWithDetailComponent extends React.Component {
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
      <ButtonWithImageComponent
        width={45}
        height={45}
        onPressHandler={this.props.onPressHandler}
        source={this.props.buttonImageSource}
      />
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
});
