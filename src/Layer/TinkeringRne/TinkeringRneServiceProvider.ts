import "./Extension/ServiceProvider";
import _ from "lodash";
import { ServiceProvider, protocultureSymbols } from "protoculture";
import { TinkeringRneApp } from "./Component/TinkeringRneApp";
import { TinkeringRneAppService } from "./Service/TinkeringRneAppService";
import { tinkeringRneSymbols } from "./Symbols";
import { protocultureReactFormRneSymbols } from "../ProtocultureReactFormRne/ProtocultureReactFormRneServiceProvider";
import { AutoWrapperConfiguration, WrappingConfiguration } from "auto-wrapper";
import { reactNativeSymbols } from "../ProtocultureReactNative/Symbols";
import { NativeConfig } from "react-native-config";
import { apiConfiguration, oauthConfiguration } from "./ApiConfiguration";
import { AuthenticationService } from "./Service/AuthenticationService";
import { Login } from "./Component/Login";


export class TinkeringRneServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureReactNativeRoot(TinkeringRneApp);
        this.configureRouting();
        this.configureConnections();
        this.configureServices();

        this.bundle.container
            .bind<AutoWrapperConfiguration>(tinkeringRneSymbols.AutoWrapperConfiguration)
            .toDynamicValue((context) => ({
                wrappers: context.container.getAll<WrappingConfiguration>(protocultureReactFormRneSymbols.WrappingConfiguration),
            }));
    }

    private configureRouting() {

        this.configureTinkeringRoutes({
            "login": {
                screen: Login,
            },
        });

        this.configureTinkeringNavigation({
            initialRouteName: "login",
            headerMode: "none",
        });
    }

    private configureConnections() {

        this.configureApiConnection("oauth", oauthConfiguration);
        this.configureApiConnection("api", apiConfiguration);
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
    }

    private configureServices() {

        this.makeInjectable(TinkeringRneAppService);
        this.bindConstructor(tinkeringRneSymbols.AppService, TinkeringRneAppService);
        this.bindConstructorParameter(tinkeringRneSymbols.AutoWrapperConfiguration, TinkeringRneAppService, 0);

        this.makeInjectable(AuthenticationService);
        this.bindConstructor(tinkeringRneSymbols.AuthenticationService, AuthenticationService);
        this.bindConstructorParameter(protocultureSymbols.EventBus, AuthenticationService, 0);
        this.bindConstructorParameter(protocultureSymbols.ApiConnections, AuthenticationService, 1);
    }
}
