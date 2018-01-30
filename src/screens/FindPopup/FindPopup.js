import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import EventList from '../../components/EventList/EventList'

class FindPopupScreen extends Component{
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
        return (
            <View>
                <EventList 
                popups={this.props.popups} 
                onEventSelected={this.eventSelectedHandler}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        popups: state.popups.popups
    }
}

export default connect(mapStateToProps)(FindPopupScreen)