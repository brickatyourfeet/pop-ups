import React from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, Text, View, StyleSheet } from 'react-native'

const FilledButton = props => {
    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
            <Text style={styles.white}>{props.children}</Text>
        </View>
    )
    if(props.disabled){
        return content
    }
    if(Platform.OS === 'android'){
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
   
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 4,
        borderRadius: 11
        
    },
    white: {
        color: 'white',
        fontWeight: 'bold'
    },
    disabled: {
        backgroundColor: 'lightgrey',
        borderColor: 'grey'
    }
})

export default FilledButton
