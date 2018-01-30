import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Header = props => (
    <Text
        {...props}
        style= {[styles.message, props.style]}
    >
    {props.children}
    </Text>
)

const styles = StyleSheet.create({
    message: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default Header
