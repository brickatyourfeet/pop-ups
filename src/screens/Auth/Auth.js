import React, { Component } from 'react'
import { Text, View, Button, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import launchIndexTabs from '../MainTabs/startMainTabApp'
import DefaultInput from '../../components/UIComponents/DefaultInput'
import Header from '../../components/UIComponents/Header'
import GlobalText from '../../components/UIComponents/GlobalText'
import FilledButton from '../../components/UIComponents/FilledButton'
import backgroundImage from '../../images/background9.png'
import validate from '../../utility/validation'
import { connect } from 'react-redux'
import { submitAttempt, authAutoSignIn } from '../../store/actions/index'

class AuthScreen extends Component {
    state = {
        authMode: 'login',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    }

    loginToggleHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }

    componentDidMount() {

    }
    
    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onAuthAttempt(authData, this.state.authMode)
    }

    updateInputState = (key, value) => {
        let connectedValue = {}
        if (this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo
            const equalValue = this.state.controls[equalControl].value
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password'){
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: 
                            key === 'password' 
                                ? validate(prevState.controls.confirmPassword.value,
                                     prevState.controls.confirmPassword.validationRules, 
                                     connectedValue) 
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    }

    render () {
        let confirmPasswordControl = null
        let submitButton = (
            <FilledButton 
                    color="teal" 
                    onPress={this.authHandler}
                    disabled={!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                        !this.state.controls.password.valid || 
                        !this.state.controls.email.valid}
                    >
                     Submit
                     </FilledButton>
        )

        if (this.state.authMode === 'signup'){
            confirmPasswordControl = (
                <DefaultInput 
                    placeholder="confirm password" 
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(inputValue) => this.updateInputState('confirmPassword', inputValue)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                    />
            )
        }
        if(this.props.isLoading){
            submitButton = <ActivityIndicator />
        } 
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
             <KeyboardAvoidingView style={styles.container}
             behavior='padding'
             >
                
                    <Header></Header>
                    <FilledButton color="teal" 
                    onPress={this.loginToggleHandler}> 
                    Switch to {this.state.authMode === 'login' ? 'signup': 'login'}
                    </FilledButton>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                    <DefaultInput 
                    placeholder="enter your email here" 
                    value={this.state.controls.value}
                    onChangeText={(inputValue) => this.updateInputState('email', inputValue)}
                    valid={this.state.controls.email.valid}
                    touched={this.state.controls.email.touched}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    />
                    <DefaultInput 
                    placeholder="password" 
                    value={this.state.controls.password.value}
                    onChangeText={(inputValue) => this.updateInputState('password', inputValue)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                    />
                    {confirmPasswordControl}
                    </View>
                    </TouchableWithoutFeedback>
                    {submitButton}
             </KeyboardAvoidingView>
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthAttempt: (authData, authMode) => dispatch(submitAttempt(authData, authMode))
        onAutoSignIn: () => dispatch(authAutoSignIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)