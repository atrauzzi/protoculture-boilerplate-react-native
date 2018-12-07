import { AutoWrapperConfiguration } from "auto-wrapper";
import { NavigationActions } from "react-navigation";


export interface TinkeringRneAppState {

    autoWrapperConfiguration: AutoWrapperConfiguration | null;
}

export class TinkeringRneAppService {

    private autoWrapperConfiguration: AutoWrapperConfiguration;

    private navigator: any;

    public constructor(
        autoWrapperConfiguration: AutoWrapperConfiguration,
    ) {
        this.autoWrapperConfiguration = autoWrapperConfiguration;
    }

    public setNavigator(navigator: any) {

        this.navigator = navigator;
    }

    public async calculateState(): Promise<TinkeringRneAppState> {

        return {
            autoWrapperConfiguration: this.autoWrapperConfiguration,
        };
    }

    public navigate(routeName: string) {

        this.navigator.dispatch(
            NavigationActions.navigate({
                routeName,
            })
        );
    }

    public tokenMissing = async () => {

        this.navigate("login");
    };

    public identityLoaded = async (identity: any) => {

        this.navigate("main");
    };
}
