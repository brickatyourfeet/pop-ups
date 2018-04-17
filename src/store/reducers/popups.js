import { SET_POPUPS } from '../actions/types'

const initialState = {
    popups: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
            case SET_POPUPS:
            return {
                ...state,
                popups: action.popups
            }
            // case DELETE_POPUP:
            //     return {
            //         ...state,
            //         popups: state.popups.filter(spot => {
            //             return spot.key !== action.key
            //           })
            //     }
        default:
            return state
            
    }
}

export default reducer