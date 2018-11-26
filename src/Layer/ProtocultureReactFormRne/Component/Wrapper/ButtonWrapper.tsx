import _ from "lodash";
import React from "react";
import { FormContext, withForm } from "protoculture-react-form";
import { ButtonProps } from "react-native-elements";


interface ComponentProps {

    children: React.ReactElement<ButtonProps>;
}

export type Props = ComponentProps & FormContext<any>;

class ButtonWrapperComponent extends React.PureComponent<Props> {

    public render() {

        const buttonElement = this.props.children;

        return React.cloneElement<ButtonProps>(buttonElement, {
            // disabled: buttonElement.props.disabled || this.props.immutable,
            onPress: this.clicked,
        });
    }

    private clicked = async () => {

        await this.props.form.submit();
    }
}

export const ButtonWrapper = withForm(ButtonWrapperComponent);
