import { AutoWrapperConfiguration } from "auto-wrapper";
import { BackHandler } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";


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

        this.navigator.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: "login" })]
        }));
        // this.navigate("login");
    };

    public sessionDestroyed = async (identity: any) => {
       
         this.navigate("login");
    }

    public sessionCreated = async (identity: any) => {

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
