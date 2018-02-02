import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet} from 'react-native'

import DefaultInput from '../UIComponents/DefaultInput'

//these inputs are using closures
const SpotInput = props => (
        <View style={styles.container}>
        <DefaultInput placeholder='Popup Title' value={props.spot} onChangeText={props.onChangeText}/>
        </View>
        )


const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center'
  }
})

export default SpotInput

