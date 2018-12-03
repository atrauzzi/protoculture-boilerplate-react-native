import { Method, ApiConnection } from "protoculture";


declare module "protoculture/lib/Data/ApiConnections" {

    export interface ConfiguredConnections {

        "oauth": ApiConnection<typeof oauthConfiguration>;
        "api": ApiConnection<typeof apiConfiguration>;
    }
}

export const oauthConfiguration = {
    routes: {
        "password-grant": {
            name: "password-grant",
            method: Method.POST,
            path: "oauth/token",
            data: {
                "grant_type": "password",
            },
        },
    },
};

export const apiConfiguration = {

    routes: {
        "identity": {
            name: "identity",
            method: Method.GET,
            path: "identity",
        },
    },
};
