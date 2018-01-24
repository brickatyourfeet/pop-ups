import React from 'react';
import { StyleSheet, View } from 'react-native';

import SpotInput from './src/components/SpotInput/SpotInput'
import EventList from './src/components/EventList/EventList'


export default class App extends React.Component {
  state = {
    popups: []
  }
//if no image is added for pop-up, just default to pop-up logo
  spotAddedHandler = spot => {
    this.setState(prevState => {
      return {
        popups: prevState.popups.concat({
          key: Math.random(),
          title: spot,   //here we'll need a legit id, and times, and lat/long
          image: {
            uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/50592-200.png'
          }
        })
      }
    })
  }

  spotTrashedHandler = key => {
    this.setState(prevState => {
      return {
        popups: prevState.popups.filter(spot => {
          return spot.key !== key
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SpotInput onSpotAdded={this.spotAddedHandler} />
        <EventList popups={this.state.popups} onEventTrashed={this.spotTrashedHandler}/>
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
    justifyContent: 'flex-start'
  }
  
});
