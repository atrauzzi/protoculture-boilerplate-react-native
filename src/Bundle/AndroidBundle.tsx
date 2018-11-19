import "es6-symbol/implement";
import React from "react";
import { AppRegistry, View } from "react-native";
import { Bundle } from "protoculture";
import { ReactNativeServiceProvider } from "../Layer/ProtocultureReactNative/ReactNativeServiceProvider";
import { name } from "../../app.json";
import { Loading } from "../Layer/TinkeringRne/Component/Loading";


export class AndroidBundle extends Bundle {
    
    public name = "react-native-tinkering-android";

    public get serviceProviders() {

        return [
            ReactNativeServiceProvider,
        ];
    }
}

// // Async init can be upsetting to React Native sometimes, espcially during debugging.
// AppRegistry.registerComponent(name, () => (props: any) => {

//     window.rootTag = props.rootTag;

//     return <View>
//         <Loading />
//     </View>
// });

const bundle = new AndroidBundle();

AppRegistry.registerRunnable(name, bundle.run.bind(bundle));

// bundle
//     .run()
//     .catch((error) => { throw error });
