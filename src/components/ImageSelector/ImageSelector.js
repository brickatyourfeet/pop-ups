import React, { Component } from 'react'
import { Image, View, Button, StyleSheet } from 'react-native'

import ImagePicker from 'react-native-image-picker'

import placeholderImage from '../../images/sn.png'
import camera from '../../images/camera.png'

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
                this.props.onImageSelected({uri: res.uri}) //2nd param , base64: res.data
            }
        })
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.placeholder}>
                <Image source={this.state.selectedPhoto ? this.state.selectedPhoto : camera} style={styles.placeholderImage}/>
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
