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

export const Drawer = createDrawerNavigator(
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

export const Main = createStackNavigator(
    {
        "drawer": {
            screen: Drawer,
        },
        // todo: Modal screens will go here.
    },
    {
        headerMode: "none",
    }
);
