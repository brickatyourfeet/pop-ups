import { createStore, combineReducers, compose } from 'redux'

import bigReducer from './reducers/popups'

const rootReducer = combineReducers({
    popups: bigReducer
})

const config = () => {
    return createStore(rootReducer)
}

export default config