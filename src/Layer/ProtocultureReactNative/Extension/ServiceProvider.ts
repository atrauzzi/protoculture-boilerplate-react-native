import _ from "lodash";
import { ServiceProvider } from "protoculture";
import { reactNativeSymbols } from "../ReactNativeServiceProvider";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        configureReactNativeRoot(rootComponent: React.ReactType): void;
    }
}

ServiceProvider.prototype.configureReactNativeRoot = function (rootComponent: React.ComponentClass) {

    this.bundle.container
        .bind<React.ComponentClass>(reactNativeSymbols.RootComponent)
        .toConstantValue(rootComponent);
};
