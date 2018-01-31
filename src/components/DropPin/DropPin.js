import React, { Component } from 'react'
import { Text, Image, View, Button, StyleSheet } from 'react-native'

class DropPin extends Component {
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.placeholder}><Text>Map</Text></View>
            <View style={styles.button}>
            <Button title='Drop Pin' onPress={()=>alert('buttons')}/>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'teal',
        width: '80%',
        height: 150
    },
    button: {
        margin: 9
    }
})

export default DropPin
