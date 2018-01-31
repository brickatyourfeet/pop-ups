import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import SpotInput from '../../components/SpotInput/SpotInput'
import { addPopup } from '../../store/actions/index'
import GlobalText from '../../components/UIComponents/GlobalText'
import Header from '../../components/UIComponents/Header'
import ImageSelector from '../../components/ImageSelector/ImageSelector'
import DropPin from '../../components/DropPin/DropPin'


class PostPopupScreen extends Component{
    state = {
        spot: '',
        start: null,
        end: null,
        info: null

    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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

    popupAddedHandler = spot => {
        this.props.onAddSpot(spot)
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <GlobalText><Header>Post an event in your area!</Header></GlobalText>
                <ImageSelector />
                <DropPin />
                <SpotInput />
                <View style={styles.button}>
                <Button title='Post Popup!' />
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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

const mapDispatchToProps = dispatch => {
    return {
        onAddSpot: (spot) => dispatch(addPopup(spot))
    }
}

export default connect(null, mapDispatchToProps)(PostPopupScreen)