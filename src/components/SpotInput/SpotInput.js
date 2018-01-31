import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet} from 'react-native'

import DefaultInput from '../UIComponents/DefaultInput'

const SpotInput = props => (
        <View style={styles.container}>
        <DefaultInput placeholder='Popup Title' value={props.spot} onChangeText={props.onChangeText}/>
        <DefaultInput placeholder='Start: MM/DD/YYYY' value={props.start} onChangeText={props.onChangeText}/>
        <DefaultInput placeholder='End: MM/DD/YYYY' value={props.end} onChangeText={props.onChangeText}/>
        <DefaultInput placeholder='Web/Info link:' value={props.info} onChangeText={props.onChangeText}/>

        </View>
        )


const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center'
  }
})

export default SpotInput

