import { AsyncStorage } from 'react-native'
import { SUBMIT_ATTEMPT, AUTH_SET_TOKEN } from './types'
import { uiStartLoading, uiStopLoading } from './index'
import startMainTabApp from '../../screens/MainTabs/startMainTabApp';

export const submitAttempt = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading())
        const apiKey = 'AIzaSyAPGVeDasm4S7x0IGL8Txpph7crqztSdUk'
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+ apiKey
        if(authMode === 'signup'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key='+  apiKey
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
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn))
                startMainTabApp()
            }
        })
    }
}

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token))
        const now = new Date()
        const expiryDate = now.getTime() + expiresIn * 1000
        console.log(now, new Date(expiryDate))
        AsyncStorage.setItem('popup:auth:token', token)
        AsyncStorage.setItem('popup:auth:expiryDate', expiryDate.toString())
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
        promise.catch(err => {
            dispatch(authClearStorage())
        })
        return promise
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