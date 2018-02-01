import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity }  from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

class SideDrawer extends Component {
    render () {
        return (
            <View 
            style={[
                styles.container,
                {width: Dimensions.get('window').width * 0.82}
            ]}
            >
                <TouchableOpacity>
                <View style={styles.drawerItem}>
                <Icon name='cancel' size={30} color='teal' style={styles.drawerItemIcon} />
                <Text> Logout </Text>
                </View>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: 'white',
        flex: 1
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    drawerItemIcon: {
        marginRight: 5
    }
})

export default SideDrawer