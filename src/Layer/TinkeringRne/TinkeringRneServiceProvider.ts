import "./Extension/ServiceProvider";
import _ from "lodash";
import { ServiceProvider, protocultureSymbols } from "protoculture";
import { TinkeringRneApp } from "./Component/TinkeringRneApp";
import { Login } from "./Component/Login";
import { TinkeringRneAppService } from "./TinkeringRneAppService";
import { tinkeringRneSymbols } from "./Symbols";
import { protocultureReactFormRneSymbols } from "../ProtocultureReactFormRne/ProtocultureReactFormRneServiceProvider";
import { AutoWrapperConfiguration, WrappingConfiguration } from "auto-wrapper";
import { reactNativeSymbols } from "../ProtocultureReactNative/Symbols";
import { NativeConfig } from "react-native-config";
import { apiConfiguration, oauthConfiguration } from "./Domain/ApiConfiguration";


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

        this.configureApiConnection((context) => {
            
            const configuration = context.container.get<NativeConfig>(reactNativeSymbols.Configuration);

            return {
                "oauth": {
                    axiosConfiguration: {
                        baseURL: configuration.API_BASE_URI,
                        data: {
                            "client_id": configuration.API_CLIENT_ID,
                            "client_secret": configuration.API_CLIENT_SECRET,
                        },
                    },
                },
                "api": {
                    axiosConfiguration: {
                        baseURL: `${configuration.API_BASE_URI}/api`,
                    },
                },
            };
        });

        this.configureApiConnection("oauth", oauthConfiguration);
        this.configureApiConnection("api", apiConfiguration);

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
        this.bindConstructorParameter(protocultureSymbols.ApiConnections, TinkeringRneAppService, 1);
    }
}
