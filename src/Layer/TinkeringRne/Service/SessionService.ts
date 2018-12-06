import moment from "moment";
import { Oauth2TokenType, ApiConnections, Oauth2Response } from "protoculture";


export class SessionService {

    private eventBus: mitt.Emitter;
    private apiConnections: ApiConnections;

    public constructor(
        eventBus: mitt.Emitter,
        apiConnections: ApiConnections
    ) {
        this.eventBus = eventBus;
        this.apiConnections = apiConnections;
    }

    public tokenLoaded = async (token: Oauth2Response) => {

        const expiresAt = moment().add(token.expires_in);

        this.apiConnections
            .connection("api")
            .setAuthorization("oauth2", {
                accessToken: {
                    type: Oauth2TokenType.Bearer,
                    expiresAt,
                    expiresIn: token.expires_in,
                    value: token.access_token,
                },
            });

        const identity = await this.apiConnections
            .connection("api")
            .call("identity");

        this.eventBus.emit("identity.loaded", identity);
    };
}
