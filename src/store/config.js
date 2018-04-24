import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import bigReducer from './reducers/popups'
import uiReducer from './reducers/ui'
import authReducer from './reducers/auth'

const rootReducer = combineReducers({
    popups: bigReducer,
    ui: uiReducer,
    auth: authReducer
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