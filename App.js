import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import PostPopupScreen from './src/screens/PostPopup/PostPopup'
import FindPopupScreen from './src/screens/FindPopup/FindPopup'
import EventInfoScreen from './src/screens/EventInfo/EventInfo'
import SideDrawer from './src/screens/SideDrawer/SideDrawer'
import config from './src/store/config'

const store = config()

//new app registers screens and starts app with react native nav

Navigation.registerComponent('popups.AuthScreen', () => AuthScreen, store, Provider)
Navigation.registerComponent('popups.FindPopupScreen', () => FindPopupScreen, store, Provider)
Navigation.registerComponent('popups.PostPopupScreen', () => PostPopupScreen, store, Provider)

Navigation.registerComponent('popups.EventInfoScreen', () => EventInfoScreen, store, Provider)

Navigation.registerComponent('popups.SideDrawer', () => SideDrawer, store, Provider)

//export main app so can run (refresh) on logout
export default () => Navigation.startSingleScreenApp({
    screen: {
        screen: "popups.AuthScreen",
        title: "Login"
    }
})