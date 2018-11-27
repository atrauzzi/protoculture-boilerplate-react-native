import React from "react";
import * as Yup from "yup";
import { Card, Button, SocialIcon } from "react-native-elements";
import { Form } from "protoculture-react-form";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import { FormInput } from "../../ProtocultureReactFormRne/Component/FormInput";
import { SubmitButton } from "../../ProtocultureReactFormRne/Component/SubmitButton";


class LoginComponent extends React.PureComponent {

    public render() {

        return <>

            <Card title="Login">

                <Form
                    schema={Yup.object({
                        usernameoremail: Yup.string().min(3, "Please enter at least 3 characters."),
                        password: Yup.string().min(6, "Please enter at least 6 characters."),
                    })}
                    data={({
                        usernameoremail: "",
                        password: "",
                    })}
                    onSubmit={this.doPasswordLogin}
                >
                    <FormInput 
                        name="usernameoremail"
                        label="Username or Email"
                        placeholder="Enter your username or email address."
                    />

                    <FormInput 
                        secureTextEntry 
                        name="password"
                        label="Password"
                        placeholder="Enter your password."
                    />

                    <SubmitButton
                        title="Go"
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

    private doPasswordLogin = async (stuff: any) => {

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
