import React from "react";
import { View } from "react-native";


class LoadingComponent extends React.PureComponent {

    public render() {

        return <View 
            style={{
                height: "100%",
                backgroundColor: "#ffffff",
            }}
        />
    }
}

export const Loading = LoadingComponent;
