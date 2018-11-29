import "./Extension/ServiceProvider";
import _ from "lodash";
import { ServiceProvider, defaultAxiosConfiguration, protocultureSymbols, Method, ConnectionConfiguration } from "protoculture";
import { TinkeringRneApp } from "./Component/TinkeringRneApp";
import { Login } from "./Component/Login";
import { TinkeringRneAppService } from "./TinkeringRneAppService";
import { tinkeringRneSymbols } from "./Symbols";
import { protocultureReactFormRneSymbols } from "../ProtocultureReactFormRne/ProtocultureReactFormRneServiceProvider";
import { AutoWrapperConfiguration, WrappingConfiguration } from "auto-wrapper";
import { reactNativeSymbols } from "../ProtocultureReactNative/Symbols";
import { NativeConfig } from "react-native-config";
import { apiConfiguration } from "./ApiConfiguration";


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
            
            return _.merge(apiConfiguration, {
                axiosConfiguration: _.merge(defaultAxiosConfiguration, {
                    baseURL: configuration.API_BASE_URI,
                }),
                routes: {
                    "authenticate": {
                        data: {
                            "client_id": configuration.API_CLIENT_ID,
                            "client_secret": configuration.API_CLIENT_SECRET,
                        },
                    },
                },
            });
        });

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
        this.bindConstructorParameter(protocultureSymbols.ApiConnection, TinkeringRneAppService, 1);
    }
}
