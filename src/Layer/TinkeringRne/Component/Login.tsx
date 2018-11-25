import React from "react";
import { Card, FormLabel, FormInput, Button, SocialIcon } from "react-native-elements";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";


class LoginComponent extends React.PureComponent {

    public render() {

        return <>

            <Card title="Login">

                <FormLabel>Username or Email</FormLabel>
                <FormInput />

                <FormLabel>Password</FormLabel>
                <FormInput 
                    secureTextEntry 
                />

                <Button
                    title="Go"
                    onPress={this.doArtMoiLogin}
                />

            </Card>

            <Card title="Third Party">

                {/* https://github.com/react-native-training/react-native-elements/issues/1600 */}
                <SocialIcon
                    button
                    type="google-plus-official"
                    title="Sign in with Google"
                    onPress={this.doGoogleLogin}
                />

                <SocialIcon 
                    button
                    type="facebook"
                    title="Sign in with Facebook"
                    onPress={this.doFacebookLogin}
                />

            </Card>
        </>
    }

    private doArtMoiLogin = async () => {

        
    }

    private doGoogleLogin = async () => {

        GoogleSignin.configure();
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        console.log(userInfo);
    };

    private doFacebookLogin = async () => {

        if (AccessToken.getCurrentAccessToken()) {

            await LoginManager.logOut();
        }

        const authorization = await LoginManager.logInWithPublishPermissions([]);

        if (authorization.error) {

            throw authorization.error;
        }

        if (authorization.isCancelled) {

            // pass
        } 
        else {

            console.log(await AccessToken.getCurrentAccessToken());
        }
    };
}

export const Login = LoginComponent;
