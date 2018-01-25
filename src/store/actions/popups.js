import { ADD_POPUP, DELETE_POPUP, SELECT_POPUP, UNSELECT_POPUP } from './types'

export const addPopup = (spot) => {
    return {
        type: ADD_POPUP,
        spot: spot
    }
}

export const deletePopup = () => {
    return {
        type: DELETE_POPUP
    }
}

export const selectPopup = (key) => {
    return {
        type: SELECT_POPUP,
        popupKey: key
    }
}

export const unselectPopup = () => {
    return {
        type: UNSELECT_POPUP
    }
}