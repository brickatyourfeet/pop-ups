import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import DefaultInput from '../../components/UIComponents/DefaultInput'
import { addPopup } from '../../store/actions/index'
import GlobalText from '../../components/UIComponents/GlobalText'
import Header from '../../components/UIComponents/Header'
import placeholderImage from '../../images/sn.png'

class PostPopupScreen extends Component{
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
                <View style={styles.placeholder}>
                    <Image source={placeholderImage} style={styles.placeholderImage}/>
                </View>
                <View style={styles.button}>
                <Button title='Add Photo' />
                </View>
                <View style={styles.placeholder}><Text>Map</Text></View>
                <View style={styles.button}>
                <Button title='Drop Pin' />
                </View>
                <DefaultInput placeholder='Popup Title' />
                <DefaultInput placeholder='Start: MM/DD/YYYY' />
                <DefaultInput placeholder='End: MM/DD/YYYY' />
                <DefaultInput placeholder='Web/Info link:' />
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