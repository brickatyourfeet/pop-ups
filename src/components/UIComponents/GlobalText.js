import React from 'react'
import { Text, StyleSheet } from 'react-native'

const GlobalText = props => (
    <Text style={styles.global}>{props.children}</Text>
)

const styles = StyleSheet.create({
    global: {
        color: "black",
        backgroundColor: "transparent"
    }
})

export default GlobalText