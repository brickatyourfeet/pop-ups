import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet} from 'react-native'

import DefaultInput from '../UIComponents/DefaultInput'


const InfoInput = props => (
        <View style={styles.container}>
        <DefaultInput placeholder='Web/Info link:' value={props.info} onChangeText={props.onChangeText}/>
        </View>
        )

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center'
  }
})

export default InfoInput
