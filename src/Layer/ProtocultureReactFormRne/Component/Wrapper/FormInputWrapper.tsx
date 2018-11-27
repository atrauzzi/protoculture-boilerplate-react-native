import _ from "lodash";
import React from "react";
import { FormContext, withForm } from "protoculture-react-form";
import { Props as FormInputProps } from "../FormInput";


interface ComponentProps {

    children: React.ReactElement<FormInputProps>;
}

export type Props = ComponentProps & FormContext<any>;

class FormInputWrapperComponent extends React.PureComponent<Props> {

    public render() {

        const formInputElement = this.props.children;
        const fieldName = formInputElement.props.name;
        const validationError = _.get(this.props.validationErrors, `${this.props.index}.${fieldName}`);

        return React.cloneElement<FormInputProps>(formInputElement, {
            defaultValue: this.props.data[fieldName],
            validationMessage: validationError ? validationError.message : null,
            onChangeText: (value) => this.changed(this.props.index, fieldName, value),
        });
    }

    public changed = async (index: number, field: string, value: string) => {

        this.props.form.setFieldValue(this.props.index, field, value);
    };
}

export const FormInputWrapper = withForm(FormInputWrapperComponent);
