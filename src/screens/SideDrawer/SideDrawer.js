import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet }  from 'react-native'

class SideDrawer extends Component {
    render () {
        return (
            <View 
            style={[
                styles.container,
                {width: Dimensions.get('window').width * 0.82}
            ]}
            >
                <Text> a drawer </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: 'white',
        flex: 1

    }
})

export default SideDrawer