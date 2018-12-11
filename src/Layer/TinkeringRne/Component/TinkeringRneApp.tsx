import _ from "lodash";
import React from "react";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { BundleConsumer, reactInject } from "../../ProtocultureReactNative/Component/ReactInject";
import { tinkeringRneSymbols } from "../Symbols";
import { AutoWrapperProvider, AutoWrapperConfiguration } from "auto-wrapper";
import { TinkeringRneAppService, TinkeringRneAppState } from "../Service/TinkeringRneAppService";
import { Main } from "./Main";
import { Login } from "./Login";
import { Loading } from "./Loading";


interface ComponentProps {

    appService: TinkeringRneAppService;
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

        this.setState(await this.props.appService.calculateState());
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

                    const NavigationContainer = createAppContainer(createSwitchNavigator(
                        {
                            "loading": {
                                screen: Loading,
                            },
                            "login": {
                                screen: Login,
                            },
                            "main": {
                                screen: Main,
                            },
                        },
                        {
                            initialRouteName: "loading",
                            headerMode: "none",
                        }
                    ));

                    return <NavigationContainer 
                        ref={(navigator: any) => this.props.appService.setNavigator(navigator)}
                    />
                }
            }
            </BundleConsumer>
            </AutoWrapperProvider>
        );
    }
}

export const TinkeringRneApp = reactInject(tinkeringRneSymbols.AppService, "appService", TinkeringRneAppComponent);
