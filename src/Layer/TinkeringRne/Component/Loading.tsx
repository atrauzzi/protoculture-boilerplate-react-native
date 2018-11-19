import React from "react";
import { View, Text } from "react-native";


// export type Props = ;

class LoadingComponent extends React.Component {

    public render() {

        return <View>
            <Text>Loading</Text>
        </View>;
    }
}

export const Loading = LoadingComponent;
