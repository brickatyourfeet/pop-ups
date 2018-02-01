import React, { Component } from 'react'
import { Text, Image, View, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

class DropPin extends Component {
    state = {
        focusedRegion: {
            latitude: 47.5989507,
            longitude: -122.3359903,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
        pinDropped: false
    }
    
    dropPinHandler = event => {
        const coords = event.nativeEvent.coordinate
        this.map.animateToRegion({
            ...this.state.focusedRegion,
            latitude: coords.latitude,
            longitude: coords.longitude

        })
        this.setState(prevState => {
            return {
                focusedRegion: {
                    ...prevState.focusedRegion,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                pinDropped: true
            }
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            this.dropPinHandler(coordsEvent)
        },
    err => {
        console.log(err)
        alert('Failed To Find Your Location, Please Drop Pin On Map')
    })
    }

    render(){
        let pin = null

        if (this.state.pinDropped){
            pin = <MapView.Marker coordinate={this.state.focusedRegion} />
        }

        return(
            <View style={styles.container}>
            <MapView 
            initialRegion={this.state.focusedRegion}
            style={styles.map}
            onPress={this.dropPinHandler}
            ref={ref => this.map = ref}
            >
            {pin}
            </MapView>
            <View style={styles.button}>
            <Button title='Drop Pin At My Location' onPress={this.getLocationHandler}/>
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
    map: {
        width: '95%',
        height: 250
    },
    button: {
        margin: 9
    }
})

export default DropPin
