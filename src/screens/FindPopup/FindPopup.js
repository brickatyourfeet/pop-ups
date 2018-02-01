import React, { Component } from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import EventList from '../../components/EventList/EventList'

class FindPopupScreen extends Component{
    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    state = {
        popupsPopulated: false,
        removeAnimation: new Animated.Value(1),
        listAnimation: new Animated.Value(0)
    }

    onNavigatorEvent = e => {
        if(e.type === 'NavBarButtonPress') {
            if(e.id === 'leftDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    animated: true,
                    side: 'left'
                })
            }
        }
    }

    popupLoadHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                popupsPopulated: true
            })
            this.nearbyLoadedHandler()
        })
    }

    nearbyLoadedHandler = () => {
        Animated.timing(this.state.listAnimation, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true
        }).start()
    }
    
    eventSelectedHandler = key => {
        const selectedPopup = this.props.popups.find(spot => {
            return spot.key === key
        })
        this.props.navigator.push({
            screen: "popups.EventInfoScreen",
            title: selectedPopup.title,
            passProps: {
                selected: selectedPopup
            }
        })
    }
    
    render() {
        let content = (
            <Animated.View
            style={{
                opacity: this.state.removeAnimation,
                transform: [{scale: this.state.removeAnimation}]
            }}
            >
            <TouchableOpacity style={styles.popupButton} onPress={this.popupLoadHandler}>
                <View style={styles.popups}>
                    <Text style={styles.buttonText}>Nearby Popups!</Text>
                </View>
            </TouchableOpacity> 
            </Animated.View>
        )
        if (this.state.popupsPopulated){
            content = (
                <Animated.View style={{
                    opacity: this.state.listAnimation
                }}>
                <EventList 
                popups={this.props.popups} 
                onEventSelected={this.eventSelectedHandler}
                />
                </Animated.View>
            )
        }
        return (
            <View style={this.state.popupsPopulated ? null : styles.buttonContainer}>
              {content}  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    popupButton: {
        borderColor: 'teal',
        borderWidth: 2,
        borderRadius: 20,
        padding: 15
    },
    buttonText: {
        color: 'teal',
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        popups: state.popups.popups
    }
}

export default connect(mapStateToProps)(FindPopupScreen)