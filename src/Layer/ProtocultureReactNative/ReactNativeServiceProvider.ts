import "./Extension/ServiceProvider";
import { ServiceProvider } from "protoculture";
import { ReactNativeApp } from "./ReactNativeApp";
import { reactNativeSymbols } from "./Symbols";
import Config from 'react-native-config';


export class ReactNativeServiceProvider extends ServiceProvider {
    
    public async boot() {

        this.bindApp(ReactNativeApp);

        this.bundle.container
            .bind(reactNativeSymbols.Configuration)
            .toConstantValue(Config);
    }
}
