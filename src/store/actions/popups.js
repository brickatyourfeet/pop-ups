import { SET_POPUPS, REMOVE_POPUP } from './types'
import { uiStartLoading, uiStopLoading } from './index'

export const addPopup = (spot, location, start, end, info, image) => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch('https://us-central1-popups-1517513406459.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64,
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
            return fetch('https://popups-1517513406459.firebaseio.com/popups.json', {
                method: 'POST',
                body: JSON.stringify(popupData)
            })
        })
        .catch(err => {
            console.log(err)
            alert('An error occurred. Try again.')
            dispatch(uiStopLoading())
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
            dispatch(uiStopLoading())
        })
    }
}

export const getPopups = () => {
    return dispatch => {
        fetch('https://popups-1517513406459.firebaseio.com/popups.json')
        .catch(err => {
            alert('An error occurred, pleast try again.')
            console.log(err)
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
        dispatch(removePopup(key))
        fetch('https://popups-1517513406459.firebaseio.com/popups/' + key + '.json', {
                method: 'DELETE'
            })
            .catch(err => {
                alert('An error occurred, pleast try again.')
                console.log(err)
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log('popup deleted')
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