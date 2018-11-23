import _ from "lodash";
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { BundleConsumer } from "../../ProtocultureReactNative/Component/ReactInject";
import { tinkeringRneSymbols } from "../TinkeringRneServiceProvider";


class TinkeringRneAppComponent extends React.PureComponent {

    public render() {

        return <BundleConsumer>
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
    }
}

export const TinkeringRneApp = TinkeringRneAppComponent;
