import moment from "moment";
import mitt from "mitt";
import { ApiConnections, Oauth2Response } from "protoculture";
import { AutoWrapperConfiguration } from "auto-wrapper";
import { PasswordLogin } from "./Domain/PasswordLogin";
import { GoogleSignin } from "react-native-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { Oauth2TokenType } from "protoculture/lib/Data/Authorization/Oauth2";


export interface TinkeringRneAppState {

    autoWrapperConfiguration: AutoWrapperConfiguration | null;
}

export class TinkeringRneAppService {
    
    private apiConnections: ApiConnections;
    private autoWrapperConfiguration: AutoWrapperConfiguration;
    private eventBus: mitt.Emitter;

    public constructor(
        autoWrapperConfiguration: AutoWrapperConfiguration,
        apiConnections: ApiConnections,
        eventBus: mitt.Emitter
    ) {
        this.autoWrapperConfiguration = autoWrapperConfiguration;
        this.apiConnections = apiConnections;
        this.eventBus = eventBus;
    }

    public async calculateState(): Promise<TinkeringRneAppState> {

        return {
            autoWrapperConfiguration: this.autoWrapperConfiguration,
        };
    }

    public async login(passwordLogin: PasswordLogin) {

        try {

            const response = await this.apiConnections
                .connection("oauth")
                .call<Oauth2Response>("password-grant", {
                    data: {
                        username: passwordLogin.usernameoremail,
                        password: passwordLogin.password,
                    },
                });

            this.apiConnections
                .connection("api")
                .setAuthorization("oauth2", {
                    accessToken: {
                        type: Oauth2TokenType.Bearer,
                        expiresAt: moment().add(response.expires_in),
                        expiresIn: response.expires_in,
                        value: response.access_token,
                    },
                });

            const identity = await this.apiConnections
                .connection("api")
                .call("identity");

            this.eventBus.emit("session.created", identity);
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
