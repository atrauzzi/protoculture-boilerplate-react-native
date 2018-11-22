import React from "react";
import { App, Bundle } from "protoculture";
import { AppRegistry } from "react-native";
import { reactNativeSymbols } from "./ReactNativeServiceProvider";
import { BundleProvider } from "./Component/ReactInject";


export class ReactNativeApp implements App {
    
    public name = "react-native";

    public working = true;

    public bundle: Bundle | null = null;

    public async run() {

        if (this.bundle) {

            const rootTag = this.bundle.container.get<number>(reactNativeSymbols.RootTag);
            const rootComponent = this.bundle.container.get<React.ComponentClass>(reactNativeSymbols.RootComponent);

            await this.runApplication(rootTag, rootComponent);
        }
    }

    private async runApplication(rootTag: number, RootComponent: React.ComponentClass) {

        AppRegistry.registerComponent(this.name, () => (props: any) => {
            
            return <BundleProvider value={this.bundle}>
                <RootComponent {...props} />
            </BundleProvider>
        });
        AppRegistry.runApplication(this.name, { rootTag });
    }
}
