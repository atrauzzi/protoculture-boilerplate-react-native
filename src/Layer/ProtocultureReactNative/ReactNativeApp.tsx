import React from "react";
import { App, Bundle } from "protoculture";
import { AppRegistry } from "react-native";
import { reactNativeSymbols } from "./Symbols";
import { BundleProvider } from "./Component/ReactInject";


export class ReactNativeApp implements App {
    
    public name = "react-native";

    public working = true;

    public bundle: Bundle | null = null;

    private eventBus: mitt.Emitter;

    public constructor(eventBus: mitt.Emitter) {

        this.eventBus = eventBus;
    }

    public async run() {

        console.disableYellowBox = true;

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

        this.eventBus.emit("app.started");
    }
}
