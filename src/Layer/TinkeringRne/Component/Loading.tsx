import React from "react";
import { View, Text } from "react-native";


class LoadingComponent extends React.PureComponent {

    public render() {

        return <View 
            style={{
                height: "100%",
                backgroundColor: "#ffffff",
            }}
        >
            {/* <Text>Loading...</Text> */}
        </View>
    }
}

export const Loading = LoadingComponent;
