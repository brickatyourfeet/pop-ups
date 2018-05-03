import { SET_POPUPS, REMOVE_POPUP } from './types'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'

export const addPopup = (spot, location, start, end, info, image) => {
    return dispatch => {
        let authToken
        dispatch(uiStartLoading())
        dispatch(authGetToken())
            .catch(()=> {
                alert('no token found')
            })
            .then(token => {
                authToken = token
                return fetch('https://us-central1-popups-1517513406459.cloudfunctions.net/storeImage', {
                    method: 'POST',
                    body: JSON.stringify({
                    image: image.base64,
                    }),
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }

            })
            })       
        .catch(err => {
            console.log(err)
            alert('An error occurred. Try again.')
            dispatch(uiStopLoading())
        })
        .then(res => res.json())
        .then(parsedRes => {
            const popupData = {
                title: spot,
                location: location,
                start: start,
                end: end,
                info: info,
                image: parsedRes.imageUrl
            }
            return fetch('https://popups-1517513406459.firebaseio.com/popups.json?auth='+ authToken, {
                method: 'POST',
                body: JSON.stringify(popupData)
            })
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
            dispatch(uiStopLoading())
        })
        .catch(err => {
            console.log(err)
            alert('An error occurred. Try again.')
            dispatch(uiStopLoading())
        })
    }
}

export const getPopups = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch('https://popups-1517513406459.firebaseio.com/popups.json?auth='+ token)
            })
            .catch(()=> {
                alert('no token found')
            })
            .then(res => res.json())
            .then(parsedRes => {
            const popups = []
            for (let key in parsedRes) {
                popups.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                })
            }
            dispatch(setPopups(popups))
        })
        .catch(err => {
            alert('An error occurred, please try again.')
            console.log(err)
        })
        
    }
}

export const setPopups = popups => {
    return {
        type: SET_POPUPS,
        popups: popups
    }
}

export const deletePopup = (key) => {
    return dispatch => {
        dispatch(authGetToken())
        .catch(()=> {
            alert('no token found')
        })
        .then(token => {
            dispatch(removePopup(key))  
            return fetch('https://popups-1517513406459.firebaseio.com/popups/' + key + '.json?auth='+ token, {
                method: 'DELETE'
            })
        })
     
    
        .then(res => res.json())
        .then(parsedRes => {
            console.log('popup deleted')
        })
        .catch(err => {
            alert('An error occurred, pleast try again.')
            console.log(err)
        })
    }
}

export const removePopup = key => {
    return {
        type: REMOVE_POPUP,
        key: key
    }
}



// return {
//     type: ADD_POPUP,
//     spot: spot,
//     location: location,
//     start: start,
//     end: end,
//     info: info,
//     image: image
// }