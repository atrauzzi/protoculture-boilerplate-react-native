import "./Extension/ServiceProvider";
import { ServiceProvider } from "protoculture";
import { TinkeringRneApp } from "./Component/TinkeringRneApp";
import { Login } from "./Component/Login";


export class TinkeringRneServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureTinkeringNavigation({});
        this.configureTinkeringRoutes({
            Login: {
                screen: Login,
            },
            LoginAgain: {
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
