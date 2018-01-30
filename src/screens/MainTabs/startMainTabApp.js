import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import popups from '../../store/reducers/popups';

const launchIndexTabs = () => {
    Promise.all([
    Icon.getImageSource('place', 30),    //icons[0]
    Icon.getImageSource('add-box', 30),   //icons[1]
    Icon.getImageSource('menu', 30)
    ]).then(icons => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "popups.FindPopupScreen",
                    label: "Find Popup!",
                    title: "Find Popups",
                    icon: icons[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: icons[2],
                                title: "Menu",
                                id: "leftDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "popups.PostPopupScreen",
                    label: "Post Popup!",
                    title: "Post Popup",
                    icon: icons[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: icons[2],
                                title: "Menu",
                                id: "leftDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabStyle: {
                tabBarBackgroundColor: '#ffff00'
            },
            appStyle: {
                tabBarButtonColor: '#ff9900' //for android - tab style for ios
            },
            drawer: {
                left: {
                    screen: "popups.SideDrawer"
                }
            }
        })
    })
     

    //navigation wants an array of all of the tabs you use
    //can add 3 or 4 here??

    //can add drawer from both sides, one for other info


}

export default launchIndexTabs

