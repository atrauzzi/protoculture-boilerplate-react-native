import { FormInput } from "./Component/FormInput";
import { FormInputWrapper } from "./Component/Wrapper/FormInputWrapper";
import { ButtonWrapper } from "./Component/Wrapper/ButtonWrapper";
import { Button } from "react-native-elements";


export const defaultProtocultureReactFormRneConfiguration = [
    {
        type: FormInput,
        with: [
            FormInputWrapper,
        ],
    },
    {
        type: Button,
        with: [
            ButtonWrapper,
        ],
    },
];
