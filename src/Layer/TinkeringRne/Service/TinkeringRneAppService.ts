import { AutoWrapperConfiguration } from "auto-wrapper";
import { BackHandler } from "react-native";
import { StackActions } from "react-navigation";


export interface TinkeringRneAppState {

    autoWrapperConfiguration: AutoWrapperConfiguration | null;
}

export class TinkeringRneAppService {

    private autoWrapperConfiguration: AutoWrapperConfiguration;

    private navigator: any | null;

    public constructor(
        autoWrapperConfiguration: AutoWrapperConfiguration,
    ) {
        this.autoWrapperConfiguration = autoWrapperConfiguration;
    }

    public setNavigator(navigator: any) {

        this.navigator = navigator;

        BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
        BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    }

    public async calculateState(): Promise<TinkeringRneAppState> {

        return {
            autoWrapperConfiguration: this.autoWrapperConfiguration,
        };
    }

    public navigate(routeName: string) {

        if (!this.navigator) {

            throw Error("Navigator not available.");
        }

        this.navigator.dispatch(StackActions.replace({
            routeName,
        }));
    }

    public tokenMissing = async () => {

        this.navigate("login");
    };

    public identityLoaded = async (identity: any) => {

        this.navigate("main");
    };

    private backPressed = () => {

        if (this.navigator.state.nav.index <= 0) {

            return true;
        }
        else if (this.navigator.state.nav.index === 1) {

            // todo: I'd love to figure out a way to hide/disable the back button visually here.
        }
    };
}
