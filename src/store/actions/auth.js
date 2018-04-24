import { SUBMIT_ATTEMPT } from './types'

export const submitAttempt = (authData) => {
    return dispatch => {
        dispatch(authSignup(authData))
    }
}

export const authSignup = (authData) => {
    return dispatch => {
        fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyAPGVeDasm4S7x0IGL8Txpph7crqztSdUk', {
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
            console.log(err)
            alert('authentication failed. please try again.')
        })
        .then(res => res.json)
        .then(parsedRes => {
            console.log(parsedRes)
        })
    }
}