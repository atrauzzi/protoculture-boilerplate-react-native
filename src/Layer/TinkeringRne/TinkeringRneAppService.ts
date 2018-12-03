import { TinkeringRneAppState } from "./Domain/TinkeringRneAppState";
import { ApiConnections } from "protoculture";
import { AutoWrapperConfiguration } from "auto-wrapper";
import { PasswordLogin } from "./Domain/PasswordLogin";
import { GoogleSignin } from "react-native-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk";


export class TinkeringRneAppService {
    
    private apiConnections: ApiConnections;
    private autoWrapperConfiguration: AutoWrapperConfiguration;

    public constructor(
        autoWrapperConfiguration: AutoWrapperConfiguration,
        apiConnections: ApiConnections
    ) {
        this.autoWrapperConfiguration = autoWrapperConfiguration;
        this.apiConnections = apiConnections;
    }

    public async calculateState(): Promise<TinkeringRneAppState> {

        return {
            autoWrapperConfiguration: this.autoWrapperConfiguration,
        };
    }

    public async login(passwordLogin: PasswordLogin) {

        try {

            this.apiConnections
                .connection("oauth")
                .call("password-grant", {
                    data: {
                        username: passwordLogin.usernameoremail,
                        password: passwordLogin.password,
                    },
                });
        }
        catch (error) {

            console.error(error);
        }
    }

    public async loginGoogle() {

        GoogleSignin.configure();

        await GoogleSignin.hasPlayServices();
        
        return await GoogleSignin.signIn();
    };

    public async loginFacebook() {

        if (AccessToken.getCurrentAccessToken()) {

            await LoginManager.logOut();
        }

        const authorization = await LoginManager.logInWithPublishPermissions([]);

        if (authorization.error) {

            throw authorization.error;
        }
        else if (authorization.isCancelled) {

            return null;
        } 

        return await AccessToken.getCurrentAccessToken();
    };
}
