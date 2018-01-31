import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet} from 'react-native'

import DefaultInput from '../UIComponents/DefaultInput'

const SpotInput = props => (
        <View>
        <DefaultInput placeholder='Popup Title' value={props.spot} onChangeText={props.onChangeText}/>


        </View>
        )



export default SpotInput

// <DefaultInput placeholder='Start: MM/DD/YYYY' value={props.start} onChangeText={props.onChangeText}/>
// <DefaultInput placeholder='End: MM/DD/YYYY' value={props.end} onChangeText={props.onChangeText}/>
// <DefaultInput placeholder='Web/Info link:' value={props.info} onChangeText={props.onChangeText}/>