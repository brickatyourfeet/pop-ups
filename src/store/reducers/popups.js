import { ADD_POPUP, DELETE_POPUP, UNSELECT_POPUP, SELECT_POPUP } from '../actions/types'

const initialState = {
    popups: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
            case ADD_POPUP:
                return {
                    ...state,
                    popups: state.popups.concat({
                        key: Math.random(),
                        title: action.spot,
                        image: {
                          uri: action.image.uri
                        },
                        location: action.location,
                        start: action.start,
                        end: action.end,
                        info: action.info
                      })
                }
            case DELETE_POPUP:
                return {
                    ...state,
                    popups: state.popups.filter(spot => {
                        return spot.key !== action.key
                      })
                }
        default:
            return state
            
    }
}

export default reducer