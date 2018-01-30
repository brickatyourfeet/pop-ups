import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

const FilledButton = props => (
    <TouchableOpacity>
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text style={styles.white}>{props.children}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 4,
        borderRadius: 11
        
    },
    white: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default FilledButton
