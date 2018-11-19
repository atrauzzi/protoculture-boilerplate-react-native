import React from "react";
import { View, Text } from "react-native";
import { Header, Card } from "react-native-elements";


export class Login extends React.PureComponent {

    public render() {
        return <View>

            <Header
                leftComponent={{ icon: "menu", color: "#fff" }}
                centerComponent={{ text: "Bwaaaaagh", style: { color: "#fff" } }}
                rightComponent={{ icon: "home", color: "#fff" }}
            />
            <Card title="Login">
                <Text>This is a React Native application!</Text>
            </Card>
        </View>
    }
}
