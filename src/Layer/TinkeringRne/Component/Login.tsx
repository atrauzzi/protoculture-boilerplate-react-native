import React from "react";
import { Card, Button, SocialIcon } from "react-native-elements";
import { Form } from "protoculture-react-form";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { FormInput } from "../../ProtocultureReactFormRne/Component/FormInput";


class LoginComponent extends React.PureComponent {

    public render() {

        return <>

            <Card title="Login">

                <Form
                    data={({
                        usernameemail: "stuff",
                        password: "stuff",
                    })}
                    onSubmit={this.doArtMoiLogin}
                    onInvalid={() => alert("incalid!")}
                >
                    <FormInput 
                        name="usernameemail"
                        label="Username or Email"
                    />

                    <FormInput 
                        secureTextEntry 
                        name="password"
                        label="Password"
                    />

                    <Button
                        title="Go"
                        onPress={() => {}}
                    />
                </Form>

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

    private doArtMoiLogin = async (stuff: any) => {

        console.log("heck!", stuff);
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
