import React, { Component } from 'react'
import { Text, View, Button, TextInput, StyleSheet, ImageBackground } from 'react-native'
import launchIndexTabs from '../MainTabs/startMainTabApp'
import startMainTabApp from '../MainTabs/startMainTabApp';
import DefaultInput from '../../components/UIComponents/DefaultInput'
import Header from '../../components/UIComponents/Header'
import GlobalText from '../../components/UIComponents/GlobalText'
import FilledButton from '../../components/UIComponents/FilledButton'
import backgroundImage from '../../images/background3.png'

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabApp()
    }
    //keep in mind popups logo will go on top of log in form
    //flex login container to the bottom
    //move around view to figure out where signup and login go
    render () {
         return (
            <ImageBackground source={backgroundImage} style={styles.background}>
             <View style={styles.container}>
                
                    <Header>Signup to continue or click Login!</Header>
                    <FilledButton color="teal" onPress={this.loginHandler}> Login </FilledButton>
                    <View style={styles.inputContainer}>
                    <DefaultInput placeholder="enter your email here" />
                    <DefaultInput placeholder="password" />
                    <DefaultInput placeholder="confirm password" />
                    </View>
                    <FilledButton color="teal" onPress={this.loginHandler}> Submit Sign Up! </FilledButton>
                
             </View>
             </ImageBackground>
         ) 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
        // borderColor: 'red',
        // borderWidth: 1
    },
    background: {
        width: '100%',
        flex: 1
    },
    inputContainer: {
        width: '80%'
    },
    logoImage: {
        flex: 2
    }
})

export default AuthScreen