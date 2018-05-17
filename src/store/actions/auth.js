import { AsyncStorage } from 'react-native'
import { SUBMIT_ATTEMPT, AUTH_SET_TOKEN } from './types'
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabApp from '../../screens/MainTabs/startMainTabApp';

const API_KEY = 'AIzaSyAPGVeDasm4S7x0IGL8Txpph7crqztSdUk'

export const submitAttempt = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading())
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+ API_KEY
        if(authMode === 'signup'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key='+  API_KEY
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(err => {
            dispatch(uiStopLoading())
            console.log(err)
            alert('authentication failed. please try again.')
        })
        .then(res => res.json)
        .then(parsedRes => {
            dispatch(uiStopLoading())
            if(!parsedRes.idToken){
                alert('authentication failed, please try again.')
            }else{
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken))
                startMainTabApp()
            }
        })
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token))
        const now = new Date()
        const expiryDate = now.getTime() + expiresIn * 1000
        console.log(now, new Date(expiryDate))
        AsyncStorage.setItem('popup:auth:token', token)
        AsyncStorage.setItem('popup:auth:expiryDate', expiryDate.toString())
        AsyncStorage.setItem('popup:auth:refreshToken', refreshToken)
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token
            if(!token){
                let fetchedToken
                AsyncStorage.getItem('popup:auth:token')
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage
                        if(!tokenFromStorage) {
                            reject()
                            return
                        }
                        return AsyncStorage.getItem('popup:auth:expiryDate')
                        .then(expiryDate => {
                            const parsedExpiryDate = new Date(parseInt(expiryDate))
                            const now = new Date()
                            if(parsedExpiryDate > now){
                                dispatch(authSetToken(fetchedToken))
                                resolve(fetchedToken)
                            }else{
                                reject()
                            }
                            
                        })
                        .catch(err => reject())
                    })
            }else{
                resolve(token)
            }
        })
        return promise
        .catch(err => {
            return AsyncStorage.getItem('popup:auth:refreshToken')
                .then(refreshToken => {
                    return fetch('https://securetoken.googleapis.com/v1/token?key=' + API_KEY, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant-type=refresh_token&refresh_token="+ refreshToken
                    })
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if(parsedRes.id_token){
                        console.log('token refreshed')
                        dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token))
                        return parsedRes.id_token
                    }else {
                        dispatch(authClearStorage())
                    }
                })

            
        })
        .then(token => {
            if(!token) throw(new Error())
            else return token
        })
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            startMainTabApp()
        })
        .catch(err => console.log('Error fetching token'))
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('popup:auth:token')
        AsyncStorage.removeItem('popup:auth:expiryDate')
    }
}