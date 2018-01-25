import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux'

import SpotInput from './src/components/SpotInput/SpotInput'
import EventList from './src/components/EventList/EventList'
import EventInfo from './src/components/EventInfo/EventInfo'
import { addPopup, selectPopup, deletePopup, unselectPopup } from './src/store/actions/index'

class App extends React.Component {

//if no image is added for pop-up, just default to pop-up logo
//will need form for beg time, end time, but list will only show title and pic
  spotAddedHandler = spot => {
    this.props.onAddPopup(spot)
    console.log('spot')
    console.log(spot)
  }

  spotSelectedHandler = key => {
    this.props.onSelectPopup(key)
  }

  eventDeletedHandler = () => {
    this.props.onDeletePopup()
  }

  pageClosedHandler = () => {
    this.props.onUnselectPopup()
  }

  render() {
    return (
      <View style={styles.container}>
        <EventInfo 
          selected={this.props.selected} 
          onEventDeleted={this.eventDeletedHandler} 
          onPageClosed={this.pageClosedHandler} 
        />
        <SpotInput onSpotAdded={this.spotAddedHandler} />
        <EventList 
          popups={this.props.popups} 
          onEventSelected={this.spotSelectedHandler}
        />
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

const mapStateToProps = state => {
  return {
    popups: state.popups.popups,
    selected: state.popups.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPopup: title => {
      console.log(addPopup(title))
      return dispatch(addPopup(title))
    },
    onDeletePopup: () => dispatch(deletePopup()),
    onSelectPopup: key => dispatch(selectPopup(key)),
    onUnselectPopup: () => dispatch(unselectPopup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// modals for everything!  - they're just other pages!
// redirect buttons for everything! map!
// change styling for list items - add shadow and elevation