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
        defaultNavigationOptions: {
            headerMode: "screen",
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
