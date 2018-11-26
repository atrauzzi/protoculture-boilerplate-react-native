import _ from "lodash";
import { ServiceProvider } from "protoculture";
import { tinkeringRneSymbols } from "../Symbols";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        configureTinkeringNavigation(configuration: any): void;
        configureTinkeringRoutes(route: any): void;
    }
}

ServiceProvider.prototype.configureTinkeringNavigation = function (configuration: any) {

    this.bundle.container
        .bind(tinkeringRneSymbols.Configuration)
        .toConstantValue(configuration);
};

ServiceProvider.prototype.configureTinkeringRoutes = function (routes: any) {

    this.bundle.container
        .bind(tinkeringRneSymbols.Route)
        .toConstantValue(routes);
};
