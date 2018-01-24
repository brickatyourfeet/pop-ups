import React from 'react'
import {StyleSheet, View, FlatList} from 'react-native'

import EventItem from '../EventItem/EventItem'

const EventList = props => {

    return (
        <FlatList
        style={styles.eventDiv}
        data={props.popups}
        renderItem={(itemData) => (
            <EventItem 
                spot={itemData.item.title} 
                dummyImage={itemData.item.image}
                onEventTouched={() => props.onEventTrashed(itemData.item.key)}/>)}
            />
        )
}

const styles = StyleSheet.create({
    eventDiv: {
        width: "75%"
    }
})

export default EventList