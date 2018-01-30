import { ADD_POPUP, DELETE_POPUP } from './types'

export const addPopup = (spot) => {
    return {
        type: ADD_POPUP,
        spot: spot
    }
}

export const deletePopup = (key) => {
    return {
        type: DELETE_POPUP,
        key: key
    }
}
