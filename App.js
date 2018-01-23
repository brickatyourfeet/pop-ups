import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    spot: ''
  }

  spotChangedHandler = (inputValue) => {
    this.setState({
      spot: inputValue
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputDiv}>
        <TextInput 
          placeholder="a placeholder"
          value={this.state.spot}
          onChangeText={this.spotChangedHandler}
          style={styles.inputField}
        />
          <Button title="Add Pop-Up!" style={styles.addButton}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputDiv: {
    //flex: 1,
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
});
