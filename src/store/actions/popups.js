import { ADD_POPUP, DELETE_POPUP } from './types'

export const addPopup = (spot, location, start, end, info, image) => {
    return dispatch => {
        const popupData = {
            title: spot,
            location: location,
            start: start,
            end: end,
            info: info
        }
        fetch('https://us-central1-popups-1517513406459.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64,
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
        })
        // fetch('https://popups-1517513406459.firebaseio.com/popups.json', {
        //     method: 'POST',
        //     body: JSON.stringify(popupData)
        // })
        // .catch(err => console.log(err))
        // .then(res => res.json())
        // .then(parsedRes => {
        //     console.log(parsedRes)
        // })
    }
}

export const deletePopup = (key) => {
    return {
        type: DELETE_POPUP,
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