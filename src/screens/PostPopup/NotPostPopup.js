import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import SpotInput from '../../components/SpotInput/SpotInput'
import StartInput from '../../components/StartInput/StartInput'
import EndInput from '../../components/EndInput/EndInput'
import InfoInput from '../../components/InfoInput/InfoInput'
import { addPopup } from '../../store/actions/index'
import GlobalText from '../../components/UIComponents/GlobalText'
import Header from '../../components/UIComponents/Header'
import ImageSelector from '../../components/ImageSelector/ImageSelector'
import DropPin from '../../components/DropPin/DropPin'
import validate from '../../utility/validation'

class PostPopupScreen extends Component{
    state = {
        controls: {
            spot: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            start: {
                value: ''
            },
            end: {
                value: ''
            },
            info: {
                value: ''
            }
        }

    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = e => {
        if(e.type === 'NavBarButtonPress') {
            if(e.id === 'leftDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    animated: true,
                    side: 'left'
                })
            }
        }
    }

    spotChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    spot: {
                        ...prevState.controls.spot,
                        value: val,
                        valid: validate(val, prevState.controls.spot.validationRules),
                        touched: true
                    },
                    start: {
                        ...prevState.controls.start,
                        value: val
                    },
                    end: {
                        ...prevState.controls.end,
                        value: val
                    },
                    info: {
                        ...prevState.controls.info,
                        value: val
                    }
                }
            }
        })
    }

    startChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    start: {
                        ...prevState.controls.spot,
                        value: val
                    }
                }
            }
        })
    }

    endChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    end: {
                        ...prevState.controls.spot,
                        value: val
                    }
                }
            }
        })
    }

    infoChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    info: {
                        ...prevState.controls.spot,
                        value: val
                    }
                }
            }
        })
    }

    //old one, not currently using
    inputChangedHandler = key => {
        return (value) => {
            this.setState({
                [key]: value
            })
        }
    }

    pinDroppedHandler = location => {
        this.setState(prevState => {

        })
    }

    //check for valid times here
    popupAddedHandler = () => {
        if(this.state.spot.trim() !== ''){
            this.props.onAddSpot(this.state.spot)
        }
        
    }

    // start={this.state.controls.start.value}
    //             end={this.state.controls.end.value}
    //             info={this.state.controls.info.value}

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <GlobalText><Header>Post an event in your area!</Header></GlobalText>
                <ImageSelector />
                <DropPin onPress={this.pinDroppedHandler} />
                <Text>{ JSON.stringify(this.state) }</Text>
                <SpotInput 
                spot={this.state.controls.spot.value}
                
                onChangeText={this.spotChangedHandler}
                />

                {/*start={this.state.start}
                end={this.state.end}
                info={this.state.info}
                onChangeText={this.inputChangedHandler}
                            <StartInput 
                
                onChangeText={this.spotChangedHandler}
                />
                <EndInput
                
                onChangeText={this.spotChangedHandler}
                />
                <InfoInput
                
                onChangeText={this.spotChangedHandler}
                />    
            
            */}
                <View style={styles.button}>
                <Button title='Post Popup!' onPress={this.popupAddedHandler}/>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'teal',
        width: '80%',
        height: 150
    },
    button: {
        margin: 9
    },
    placeholderImage: {
        width: '100%',
        height: '100%'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddSpot: (popup) => dispatch(addPopup(popup))
    }
}

export default connect(null, mapDispatchToProps)(PostPopupScreen)