import "./Extension/ServiceProvider";
import { ServiceProvider, protocultureSymbols } from "protoculture";
import { ReactNativeApp } from "./ReactNativeApp";
import { reactNativeSymbols } from "./Symbols";
import Config from 'react-native-config';


export class ReactNativeServiceProvider extends ServiceProvider {
    
    public async boot() {

        this.bindApp(ReactNativeApp);
        this.bindConstructorParameter(protocultureSymbols.EventBus, ReactNativeApp, 0);

        this.bundle.container
            .bind(reactNativeSymbols.Configuration)
            .toConstantValue(Config);
    }
}
