import { Bundle } from "protoculture";
import { ReactNativeServiceProvider } from "../Layer/ReactNative/ReactNativeServiceProvider";


export class AndroidBundle extends Bundle {
    
    public name = "react-native-tinkering-android";

    public get serviceProviders() {

        return [
            ReactNativeServiceProvider,
        ];
    }
}
