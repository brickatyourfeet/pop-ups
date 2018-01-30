import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import SpotInput from '../../components/SpotInput/SpotInput'
import { addPopup } from '../../store/actions/index'

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
            <View>
                <SpotInput onSpotAdded={this.popupAddedHandler}/>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddSpot: (spot) => dispatch(addPopup(spot))
    }
}

export default connect(null, mapDispatchToProps)(PostPopupScreen)