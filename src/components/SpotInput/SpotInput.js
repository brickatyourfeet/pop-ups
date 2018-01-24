import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet} from 'react-native'

class SpotInput extends Component {
    state = {
        spot: ''
      }
    
      spotChangedHandler = (inputValue) => {
        this.setState({
          spot: inputValue
        })
      }

      spotSubmitHandler = () =>{
        if(this.state.spot.trim() === ''){
          return
        }
    
        this.props.onSpotAdded(this.state.spot)
      }

    render(){
        return (
        <View style={styles.inputDiv}>
        <TextInput 
          placeholder="a placeholder"
          value={this.state.spot}
          onChangeText={this.spotChangedHandler}
          style={styles.inputField}
        />
          <Button title="Add Pop-Up!" style={styles.addButton} onPress={this.spotSubmitHandler}/>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    inputDiv: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      inputField: {
        width: "65%",
        color: "red",
        fontFamily: "TrebuchetMS-Bold"
        // textShadowColor: "#deb887",
        // textShadowRadius: 1
      },
      addButton: {
        width: "35%"
      }
})

export default SpotInput