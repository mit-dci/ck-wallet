import React from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions} from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import {RED_COLOR, APP_BACKGROUND_COLOR, FORM_FIELD_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DETAIL_TEXT_COLOR} from '../constants/styles.js';


export default class SlidingDrawerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   const Header = ({ isOpen }) =>(
    <View
      style={{ flexDirection: 'column',
               }}>
          <View style={{
              flexDirection: 'row',
              paddingTop: 15,
              paddingRight: 15,
              paddingLeft: 15,
              paddingBottom: 15,
              borderBottomWidth: 0.5,
              borderBottomColor: 'silver',
              backgroundColor: APP_BACKGROUND_COLOR,
              width: Dimensions.get('window').width,
              height: 55,
            }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
            <View style={{flex: 0.5}}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: this.props.isSpent ? RED_COLOR : BUTTON_BACKGROUND_COLOR,}}> {`${this.props.isSpent ? 'SENT' : 'RECEIVED'}`}</Text>
            </View>

            <View style={{flex: 0.5, flexDirection: 'column', justifyContent: 'flex-start', }}>
              <Text style={{fontSize: 16, color: DETAIL_TEXT_COLOR, textAlign: 'center'}}> {this.props.month} </Text>
              <Text style={{fontSize: 16, color: DETAIL_TEXT_COLOR, textAlign: 'center'}}> {this.props.day} </Text>
            </View>
          </View>


          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end',}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white', }}>  {`${this.props.isSpent ? '-' : '+'}`} {this.props.outputValue} </Text>
          </View>

         </View>

       </View>);

        const Content = (
          <View style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              backgroundColor: FORM_FIELD_BACKGROUND_COLOR,
            }}>
              <View style={{flex: 0, flexDirection: 'row', marginBottom: 3, marginLeft: 3, }}>
                <View style={{flex: 0, justifyContent: 'flex-start'}}>
                  <Text style={{color: 'white' }}> Transaction ID </Text>
                </View>
              </View>

              <View style={{flex: 0, flexDirection: 'row', marginLeft: 3,}}>
                <View style={{flex: 0, justifyContent: 'flex-start'}}>
                  <Text style={{color: 'white' }}> {this.props.transactionId.substring(0,42) + "..."} </Text>
                </View>
              </View>

            </View>);

    return (
      <View style={styles.container}>
        <Accordion
          header={Header}
          content={Content}
          duration={150}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
