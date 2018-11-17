import React from "react";
import { App } from "protoculture";
import { View, Text, AppRegistry } from "react-native";
import { Card, Header } from "react-native-elements";
import { name } from "../../../app.json";


export class ReactNativeApp implements App {
    
    public name = "react-native";

    public working = true;

    public bundle = null;

    public async run() {
console.log("registering");
        AppRegistry.registerComponent(name, () => (props: any) => (<View>

            <Header
                leftComponent={{ icon: "menu", color: "#fff" }}
                centerComponent={{ text: "Bwaaaaagh", style: { color: "#fff" } }}
                rightComponent={{ icon: "home", color: "#fff" }}
            />
            <Card title="Login">
                <Text>This is a React Native application!</Text>
            </Card>
        </View>));
    }
}
