import { TinkeringRneAppState } from "./Domain/TinkeringRneAppState";
import { AutoWrapperConfiguration } from "auto-wrapper";


export class TinkeringRneAppService {
    
    private autoWrapperConfiguration: AutoWrapperConfiguration;

    public constructor(
        autoWrapperConfiguration: AutoWrapperConfiguration
    ) {

        this.autoWrapperConfiguration = autoWrapperConfiguration;
    }

    public async calculateState(): Promise<TinkeringRneAppState> {

        return {
            autoWrapperConfiguration: this.autoWrapperConfiguration,
        };
    }
}
