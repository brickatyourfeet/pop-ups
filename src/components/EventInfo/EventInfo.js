import React from 'react'
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native'

const EventInfo = props => {
    let popupModal = null

    if (props.selected) {
        popupModal = (
            <View>
                <Image source={props.selected.image} style={styles.eventPic}/>
                <Text style={styles.title}>{props.selected.title}</Text>
            </View>
        )
    }
    return (
        <Modal 
        onRequestClose={props.onPageClosed}
        visible={props.selected !== null} 
        animationType="fade"
        >
            <View style={styles.modalDiv}>
                {popupModal}
                <View>
                    <Button title="Not Interested" color="purple" onPress={props.onEventDeleted}/>
                    <Button title="Close" color="green" onPress={props.onPageClosed}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalDiv: {
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

    }
})

export default EventInfo

// alternate way to handle no user entered picture <Modal>         <View>
//      <Image source ={props.selected ? props.selected.dummyImage :
// '../../images/sn.png'} />             <Text>{props.selected.spot}</Text>
//        <View>                 <Button />                 <Button />
//   </View>         </View>     </Modal>