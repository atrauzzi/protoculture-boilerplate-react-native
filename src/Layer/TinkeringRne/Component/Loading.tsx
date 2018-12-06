import React from "react";
import { View } from "react-native";


class LoadingComponent extends React.PureComponent {

    public render() {

        return <View 
            style={{
                backgroundColor: "#ffffff",
            }}
        />
    }
}

export const Loading = LoadingComponent;
