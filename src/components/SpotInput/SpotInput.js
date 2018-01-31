import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet} from 'react-native'

import DefaultInput from '../UIComponents/DefaultInput'

class SpotInput extends Component {
    state = {
        spot: '',
        start: null,
        end: null,
        info: null
      }
    
      spotChangedHandler = (inputValue) => {
        this.setState({
          spot: inputValue
        })
      }

      startChangedHandler = (inputValue) => {
        this.setState({
          start: inputValue
        })
      }

      endChangedHandler = (inputValue) => {
        this.setState({
          end: inputValue
        })
      }

      infoChangedHandler = (inputValue) => {
        this.setState({
          info: inputValue
        })
      }

      // spotSubmitHandler = () =>{
      //   if(this.state.spot.trim() === ''){
      //     return
      //   }
    
      //   this.props.onSpotAdded(this.state.spot)
      // }

    render(){
        return (
        <View>
        <DefaultInput placeholder='Popup Title' value={this.state.spot} onChangeText={this.spotChangedHandler}/>
        <DefaultInput placeholder='Start: MM/DD/YYYY' value={this.state.start} onChangeText={this.state.startChangedHandler}/>
        <DefaultInput placeholder='End: MM/DD/YYYY' value={this.state.end} onChangeText={this.state.endChangedHandler}/>
        <DefaultInput placeholder='Web/Info link:' value={this.state.info} onChangeText={this.state.infoChangedHandler}/>
        </View>
        )
    }
}


export default SpotInput