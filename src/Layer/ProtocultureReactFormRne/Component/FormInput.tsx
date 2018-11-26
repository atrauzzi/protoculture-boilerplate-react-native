import React from "react";
import { FormInput as RneFormInput, FormInputProps as RneFormInputProps, FormLabel, FormValidationMessage } from "react-native-elements";


export interface ComponentProps {

    name: string;
    label?: string;
    validationMessage?: string;
}

export type Props = ComponentProps & RneFormInputProps;

class FormInputComponent extends React.PureComponent<Props> {

    public render() {

        return <>

            { this.renderLabel() }

            <RneFormInput
                { ...this.props }
            />

            { this.renderValidation() }

        </>
    }

    private renderLabel() {

        if (!this.props.label) {

            return null;
        }
        
        return <FormLabel>
            { this.props.label }
        </FormLabel>
    }

    private renderValidation() {

        if (!this.props.validationMessage) {

            return null;
        }

        return <FormValidationMessage>
            { this.props.validationMessage }
        </FormValidationMessage>
    }
}

export const FormInput = FormInputComponent;
