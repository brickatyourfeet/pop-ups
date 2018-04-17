import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'


const EventItem = (props) => (
    <TouchableHighlight onPress={props.onEventTouched}>
    <View style = {styles.eventItem} >
    <Image resizeMode="cover" source={props.dummyImage} style={styles.dummyImage}/>
    <Text style={styles.title}>{props.spot}</Text>
    </View>
    </TouchableHighlight>

)

const styles = StyleSheet.create({
    eventItem: {
        width: '90%',
        padding: 5,
        backgroundColor: "orange",
        margin: 4,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30
    },
    title: {
        fontWeight: 'bold'
    },
    dummyImage: {
        marginRight: 5,
        height: 50,
        width: 30,

    }
})

export default EventItem