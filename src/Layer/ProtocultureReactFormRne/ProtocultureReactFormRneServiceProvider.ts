import { ServiceProvider } from "protoculture";
import { WrappingConfiguration } from "auto-wrapper";
import { defaultProtocultureReactFormRneConfiguration } from "./DefaultConfiguration";


export class ProtocultureReactFormRneServiceProvider extends ServiceProvider {

    public async boot() {

        defaultProtocultureReactFormRneConfiguration.forEach((configuration) => this.bundle.container
            .bind<WrappingConfiguration>(protocultureReactFormRneSymbols.WrappingConfiguration)
            .toConstantValue(configuration));
    }
}

export const protocultureReactFormRneSymbols = {
    WrappingConfiguration: Symbol("WrappingConfiguration"),
};
