import { ADD_POPUP, DELETE_POPUP, UNSELECT_POPUP, SELECT_POPUP } from '../actions/types'

const initialState = {
    popups: [],
    selected: null
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
                          uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/50592-200.png'
                        }
                      })
                }
            case DELETE_POPUP:
                return {
                    ...state,
                    popups: state.popups.filter(spot => {
                        return spot.key !== state.selected.key
                      }),
                      selected: null
                }
            case SELECT_POPUP:
                return {
                    ...state,
                    selected: state.popups.find(popup => {
                        return popup.key === action.popupKey
                      })
                }
            case UNSELECT_POPUP:
                return {
                    ...state,
                    selected: null
                }
        default:
            return state
            
    }
}

export default reducer