import React from "react";
import { Button as RneButton, ButtonProps as RneButtonProps } from "react-native-elements";
import { UsesFormContext, withForm } from "protoculture-react-form";


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Props = UsesFormContext<any> & Omit<RneButtonProps, "onPress">;

class SubmitButtonComponent extends React.PureComponent<Props> {

    public render() {

        return <RneButton
            { ...this.props }
            onPress={this.pressed}
        />
    }

    private pressed = async () => {

        this.props.form.submit();
    };
}

export const SubmitButton = withForm(SubmitButtonComponent);
