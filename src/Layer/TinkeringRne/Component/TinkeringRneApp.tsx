import _ from "lodash";
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { BundleConsumer, reactInject } from "../../ProtocultureReactNative/Component/ReactInject";
import { tinkeringRneSymbols } from "../Symbols";
import { AutoWrapperProvider, AutoWrapperConfiguration } from "auto-wrapper";
import { TinkeringRneAppService, TinkeringRneAppState } from "../Service/TinkeringRneAppService";


interface ComponentProps {

    service: TinkeringRneAppService;
}

export type Props = ComponentProps;

class TinkeringRneAppComponent extends React.PureComponent<Props, TinkeringRneAppState> {

    public constructor(props: any) {

        super(props);

        this.state = {
            autoWrapperConfiguration: null,
        };
    }

    public async componentDidMount() {

        this.setState(await this.props.service.calculateState());
    }

    public render() {

        return (
            <AutoWrapperProvider value={this.state.autoWrapperConfiguration || {} as any as AutoWrapperConfiguration}>
            <BundleConsumer>
            {
                (bundle) => {

                    if (!bundle) {

                        return null;
                    }

                    const configuration = bundle.container.get(tinkeringRneSymbols.Configuration);
                    const routes = bundle.container.getAll(tinkeringRneSymbols.Route);

                    const NavigationContainer = createAppContainer(createStackNavigator(
                        routes.reduce((previous, current) => ({ ...previous, ...current }), {}),
                        configuration
                    ));

                    return <NavigationContainer />
                }
            }
            </BundleConsumer>
            </AutoWrapperProvider>
        )
    }
}

export const TinkeringRneApp = reactInject(tinkeringRneSymbols.AppService, "service", TinkeringRneAppComponent);
