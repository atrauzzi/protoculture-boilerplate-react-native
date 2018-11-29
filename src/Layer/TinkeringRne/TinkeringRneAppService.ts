import Config from "react-native-config";
import { TinkeringRneAppState } from "./Domain/TinkeringRneAppState";
import { ApiConnection } from "protoculture";
import { AutoWrapperConfiguration } from "auto-wrapper";
import { PasswordLogin } from "./Domain/PasswordLogin";
import { GoogleSignin } from "react-native-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk";


export class TinkeringRneAppService {
    
    private apiConnection: ApiConnection<any, any>;
    private autoWrapperConfiguration: AutoWrapperConfiguration;

    public constructor(
        autoWrapperConfiguration: AutoWrapperConfiguration,
        apiConnection: ApiConnection<any, any>
    ) {
        this.autoWrapperConfiguration = autoWrapperConfiguration;
        this.apiConnection = apiConnection;
    }

    public async calculateState(): Promise<TinkeringRneAppState> {

        return {
            autoWrapperConfiguration: this.autoWrapperConfiguration,
        };
    }

    public async login(passwordLogin: PasswordLogin) {

        console.log(this.apiConnection);

        try {

            this.apiConnection.call("authenticate", {
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
