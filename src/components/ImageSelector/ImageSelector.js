import React, { Component } from 'react'
import { Image, View, Button, StyleSheet } from 'react-native'

import placeholderImage from '../../images/sn.png'

class ImageSelector extends Component {
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.placeholder}>
                <Image source={placeholderImage} style={styles.placeholderImage}/>
            </View>
            <View style={styles.button}>
                <Button title='Add Photo' onPress={()=>alert('buttons')}/>
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
    },
    placeholderImage: {
        width: '100%',
        height: '100%'
    }
})

export default ImageSelector
