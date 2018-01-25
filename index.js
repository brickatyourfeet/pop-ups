import React from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import App from './App';
import config from './src/store/config'

const store = config()

const ReactNativeRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent('popups', () => ReactNativeRedux);
