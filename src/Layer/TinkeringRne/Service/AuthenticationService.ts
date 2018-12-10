import mitt from "mitt";
import { ApiConnections, Oauth2Response } from "protoculture";
import { PasswordLogin } from "../Domain/PasswordLogin";
import { GoogleSignin } from "react-native-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import sensitiveInfo from "react-native-sensitive-info";


export class AuthenticationService {

    private eventBus: mitt.Emitter;
    private apiConnections: ApiConnections;

    public constructor(
        eventBus: mitt.Emitter,
        apiConnections: ApiConnections
    ) {
        this.eventBus = eventBus;
        this.apiConnections = apiConnections;
    }

    public async login(passwordLogin: PasswordLogin) {

        const token = await this.apiConnections
            .connection("oauth")
            .call<Oauth2Response>("password-grant", {
                data: {
                    username: passwordLogin.usernameoremail,
                    password: passwordLogin.password,
                },
            });

        await sensitiveInfo.setItem("oauth2.token", JSON.stringify(token), {});

        this.eventBus.emit("token.loaded", token);
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

    public appStarted = async () => {

        const tokenJson = await sensitiveInfo.getItem("oauth2.token", {});

        if (tokenJson) {

            const token = JSON.parse(tokenJson);

            this.eventBus.emit("token.loaded", token);
        }
        else {

            this.eventBus.emit("token.missing");
        }
    };

    public sessionDestroyed = async () => {

        await sensitiveInfo.deleteItem("oauth2.token", {});
    };
}
