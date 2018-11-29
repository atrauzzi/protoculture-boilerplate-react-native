import { ConnectionConfiguration, Method } from "protoculture";


export const apiConfiguration: ConnectionConfiguration<any> = {

    routes: {
        "authenticate": {
            name: "authenticate",
            method: Method.POST,
            path: "oauth/token",
            data: {
                "grant_type": "password",
            },
        },
    },
};
