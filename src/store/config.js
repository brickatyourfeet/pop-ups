import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import bigReducer from './reducers/popups'

const rootReducer = combineReducers({
    popups: bigReducer
})

let composeEnhancers = compose

if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const config = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    //adding this guy lets us include 'enhancers' or middleware & redux devtools
}

export default config