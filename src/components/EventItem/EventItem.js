import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'


const EventItem = (props) => (
    <TouchableHighlight onPress={props.onEventTouched}>
    <View style = {styles.eventItem} >
    <Image resizeMode="cover" source={props.dummyImage} style={styles.dummyImage}/>
    <Text>{props.spot}</Text>
    </View>
    </TouchableHighlight>

)

const styles = StyleSheet.create({
    eventItem: {
        width: '80%',
        padding: 5,
        backgroundColor: "#fcdede",
        margin: 4,
        flexDirection: "row",
        alignItems: "center"
    },
    dummyImage: {
        marginRight: 5,
        height: 30,
        width: 30,

    }
})

export default EventItem