import "./Extension/ServiceProvider";
import { ServiceProvider } from "protoculture";
import { TinkeringRneApp } from "./Component/TinkeringRneApp";
import { Login } from "./Component/Login";
import { TinkeringRneAppService } from "./TinkeringRneAppService";
import { tinkeringRneSymbols } from "./Symbols";
import { protocultureReactFormRneSymbols } from "../ProtocultureReactFormRne/ProtocultureReactFormRneServiceProvider";
import { AutoWrapperConfiguration, WrappingConfiguration } from "auto-wrapper";


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

        this.bundle.container
            .bind<AutoWrapperConfiguration>(tinkeringRneSymbols.AutoWrapperConfiguration)
            .toDynamicValue((context) => ({
                wrappers: [
                    ...context.container.getAll<WrappingConfiguration>(protocultureReactFormRneSymbols.WrappingConfiguration)
                ],
            }))

        this.makeInjectable(TinkeringRneAppService);
        this.bindConstructor(tinkeringRneSymbols.AppService, TinkeringRneAppService);
        this.bindConstructorParameter(tinkeringRneSymbols.AutoWrapperConfiguration, TinkeringRneAppService, 0);
    }
}
