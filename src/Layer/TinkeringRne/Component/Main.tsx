import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Home } from "./Home";
import { Menu } from "./Menu";


const AppStack = createStackNavigator(
    {
        "home": {
            screen: Home,
            navigationOptions: {
                title: "Home",
            },
        },
    },
    {
        initialRouteName: "home",
        headerMode: "none",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#000000",
            },
            headerTitleStyle: {
                color: "#ffffff",
            },
        },
    }
);

export const Main = createDrawerNavigator(
    {
        "app": {
            screen: AppStack,
        },
    },
    {
        contentComponent: Menu,
        initialRouteName: "app",
    }
);
