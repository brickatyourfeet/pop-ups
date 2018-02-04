import React, { Component } from 'react'
import { Image, View, Button, StyleSheet } from 'react-native'

import ImagePicker from 'react-native-image-picker'

import placeholderImage from '../../images/sn.png'

class ImageSelector extends Component {
    state = {
        selectedPhoto: null
    }

    selectImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Select an image'}, res => {
            if (res.didCancel){
                console.log('user cancelled image selection')
            } else if (res.error){
                console.log('error: ', res.err)
            } else {
                this.setState({
                    selectedPhoto: {
                        uri: res.uri
                    }
                })
            }
        })
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.placeholder}>
                <Image source={this.state.selectedPhoto} style={styles.placeholderImage}/>
            </View>
            <View style={styles.button}>
                <Button title='Add Photo' onPress={this.selectImageHandler}/>
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
