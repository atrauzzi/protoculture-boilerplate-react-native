import React from "react";
import { Text } from "react-native";


class HomeComponent extends React.PureComponent {

    public render() {

        return <Text>
            Oh hi there Mr. Authenticated!
        </Text>
    }
}

export const Home = HomeComponent;
