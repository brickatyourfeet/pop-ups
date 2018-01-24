import React from 'react';
import { StyleSheet, View } from 'react-native';

import SpotInput from './src/components/SpotInput/SpotInput'
import EventList from './src/components/EventList/EventList'
import EventInfo from './src/components/EventInfo/EventInfo'

export default class App extends React.Component {
  state = {
    popups: [],
    selected: null
  }
//if no image is added for pop-up, just default to pop-up logo
//will need form for beg time, end time, but list will only show title and pic
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

  spotSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selected: prevState.popups.find(popup => {
          return popup.key === key
        })
      }
    })

  }

  eventDeletedHandler = () => {
    this.setState(prevState => {
      return {
        popups: prevState.popups.filter(spot => {
          return spot.key !== prevState.selected.key
        }),
        selected: null
      }
    })
  }

  pageClosedHandler = () => {
    this.setState({
      selected: null
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <EventInfo 
          selected={this.state.selected} 
          onEventDeleted={this.eventDeletedHandler} 
          onPageClosed={this.pageClosedHandler} 
        />
        <EventList selected={this.state.selected} />
        <SpotInput onSpotAdded={this.spotAddedHandler} />
        <EventList popups={this.state.popups} onEventSelected={this.spotSelectedHandler}/>
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



// modals for everything!  - they're just other pages!
// redirect buttons for everything! map!
// change styling for list items - add shadow and elevation