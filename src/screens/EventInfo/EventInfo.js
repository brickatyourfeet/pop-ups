import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    Touchable,
    TouchableHighlight
} from 'react-native'
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { deletePopup } from '../../store/actions/index'

class EventInfo extends Component {
    spotDeletedHandler = () => {
        console.log(this.props)
        this.props.onDeleteSpot(this.props.selected.key)
        this.props.navigator.pop()  //essentially a back button!
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={this.props.selected.image} style={styles.eventPic}/>
                    <Text style={styles.title}>{this.props.selected.title}</Text>
                </View>
                <View>{/* button section start */}

                    <View style={styles.notInterestedButton}>
                        <Text>Not Interested?</Text>
                        <TouchableHighlight onPress={this.spotDeletedHandler}>
                            <Icon size={90} name="event-busy" color="purple"/>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.notInterestedButton}>
                        <Text>Map it!</Text>
                        <TouchableHighlight>
                            <Icon size={90} name="directions" color="purple"/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    eventPic: {
        width: "95%",
        height: 200
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 30

    },
    notInterestedButton: {
        alignItems: "center"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeleteSpot: (key) => dispatch(deletePopup(key))
    }
}

export default connect(null, mapDispatchToProps)(EventInfo)
