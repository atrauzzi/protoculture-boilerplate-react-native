import "./Extension/ServiceProvider";
import { ServiceProvider } from "protoculture";
import { TinkeringRneApp } from "./Component/TinkeringRneApp";
import { Login } from "./Component/Login";


export class TinkeringRneServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureTinkeringNavigation({
            initialRouteName: "login",
            headerMode: "none",
        });

        this.configureTinkeringRoutes({
            "login": {
                screen: Login,
            },
        });

        this.configureReactNativeRoot(TinkeringRneApp);
    }
}

export const tinkeringRneSymbols = {
    Configuration: Symbol("TinkeringRneConfiguration"),
    Route: Symbol("TinkeringRneRoute"),
};
