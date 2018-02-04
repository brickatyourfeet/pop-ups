import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    Touchable,
    TouchableHighlight,
    Dimensions,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

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
            <ScrollView>
            
            <MapView initialRegion={{
                ...this.props.selected.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            }}
            style={styles.map}
            >
            <MapView.Marker
            coordinate={this.props.selected.location}
            />
            
            </MapView>

            
            
            <View style={styles.container}>

                <View style={styles.filler}>
                <Text>{this.props.selected.start}</Text>
                <Text>{this.props.selected.end}</Text>
                <Text>{this.props.selected.info}</Text>
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
            <View>
            <MapView initialRegion={{
                ...this.props.selected.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            }}
            style={styles.map}
            >
            <MapView.Marker
            coordinate={this.props.selected.location}
            />
            
            </MapView>
            </View>
            <Text>{this.props.selected.location.longitude}</Text>
            <Text style={styles.title}>{this.props.selected.title}</Text>
            <View>
                    <Image source={this.props.selected.image} style={styles.eventPic}/>
                    <Text style={styles.title}>{this.props.selected.title}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        flexDirection: 'column'
    },
    flexContainer: {
        flex: 1
    },
    infoContainer: {
        flex: 2
    },
    filler: {

        width: "98%",
        height: "98%"
    },
    eventPic: {
        width: "98%",
        height: "98%"
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20
    },
    notInterestedButton: {
        //make table of rows and columns for buttons? 
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeleteSpot: (key) => dispatch(deletePopup(key))
    }
}

export default connect(null, mapDispatchToProps)(EventInfo)
