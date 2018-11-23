import React from "react";
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from "react-native-elements";


export class Login extends React.PureComponent {

    public render() {

        return <Card title="Login">

            <FormLabel>Username or Email</FormLabel>
            <FormInput />

            <FormLabel>Password</FormLabel>
            <FormInput 
                secureTextEntry 
            />

            <Button
                title="Go"
                onPress={() => this.doLogin()}
            />

        </Card>
    }

    private async doLogin() {


    }
}
