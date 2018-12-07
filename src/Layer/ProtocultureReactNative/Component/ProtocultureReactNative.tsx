import React from "react";
import { Constructor } from "react-native";
import { Bundle } from "protoculture";
import { reactNativeSymbols } from "../Symbols";


interface ComponentProps {

    bundleType: Constructor<Bundle>;
    rootTag: number;
    children: React.ReactNode;
}

export type Props = ComponentProps;

interface State {
    bundle: Bundle;
}

class ProtocultureReactNativeComponent extends React.PureComponent<Props, State> {

    public constructor(props: Props) {

        super(props);

        this.state = {
            bundle: new props.bundleType(),
        };
    }

    public async componentDidMount() {
        
        this.state.bundle.run();

        this.state.bundle.container
            .bind(reactNativeSymbols.RootTag)
            .toConstantValue(this.props.rootTag);
    }

    public render() {

        return this.props.children;
    }
}

export const ProtocultureReactNative = ProtocultureReactNativeComponent;
