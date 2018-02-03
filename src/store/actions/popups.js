import { ADD_POPUP, DELETE_POPUP } from './types'

export const addPopup = (spot, location, start, end, info) => {
    return {
        type: ADD_POPUP,
        spot: spot,
        location: location,
        start: start,
        end: end,
        info: info
    }
}

export const deletePopup = (key) => {
    return {
        type: DELETE_POPUP,
        key: key
    }
}

//addPopup will take in an object with {spot, start, end, info}  ??