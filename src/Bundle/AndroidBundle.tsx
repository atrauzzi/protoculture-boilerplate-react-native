import "core-js";
import React from "react";
import { Bundle } from "protoculture";
import { ProtocultureReactNative } from "../Layer/ProtocultureReactNative/Component/ProtocultureReactNative";
import { AppRegistry, View, Text } from "react-native";
import { name } from "../../app.json";
import { ReactNativeServiceProvider } from "../Layer/ProtocultureReactNative/ReactNativeServiceProvider";
import { TinkeringRneServiceProvider } from "../Layer/TinkeringRne/TinkeringRneServiceProvider";
import { ProtocultureReactFormRneServiceProvider } from "../Layer/ProtocultureReactFormRne/ProtocultureReactFormRneServiceProvider";


export class AndroidBundle extends Bundle {
    
    public name = "react-native-tinkering-android";

    public get serviceProviders() {

        return [
            ProtocultureReactFormRneServiceProvider,
            ReactNativeServiceProvider,
            TinkeringRneServiceProvider,
        ];
    }
}

AppRegistry.registerComponent(name, () => (props: any) => {

    return <ProtocultureReactNative
        bundleType={AndroidBundle}
        rootTag={props.rootTag}
    >
        <View>
            <Text>Loading Android...</Text>
        </View>
    </ProtocultureReactNative>
});
