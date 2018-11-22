import "./Extension/ServiceProvider";
import { ServiceProvider } from "protoculture";
import { ReactNativeApp } from "./ReactNativeApp";


export class ReactNativeServiceProvider extends ServiceProvider {
    
    public async boot() {

        this.bindApp(ReactNativeApp);
    }
}

export const reactNativeSymbols = {
    RootTag: Symbol("RootTag"),
    RootComponent: Symbol("RootComponent"),
};
