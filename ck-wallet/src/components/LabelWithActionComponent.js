import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import ButtonWithImageComponent from './ButtonWithImageComponent';
import { FORM_FIELD_BACKGROUND_COLOR } from '../constants/styles.js';

export default class TextInputWithDetailComponent extends React.Component {

  render() {
    return (
    <View style={styles.container}>
      <View style={styles.labelViewStyle}>
        <Text style={{color: 'white'}} numberOfLines={1} textAlign={'center'}> {this.props.label} </Text>
      </View>
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
    width: 340,
    height: 46,
    justifyContent: 'center',
  },
    labelViewStyle: {
    flex: 0,
    backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
    width: 288,
    height: 46,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
