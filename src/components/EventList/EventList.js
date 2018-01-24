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
                onEventTouched={() => props.onEventSelected(itemData.item.key)}/>)}
            />
        )
}

const styles = StyleSheet.create({
    eventDiv: {
        width: "100%"
    }
})

export default EventList