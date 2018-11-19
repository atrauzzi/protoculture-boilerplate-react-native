import { App } from "protoculture";
import { AppRegistry } from "react-native";
import { Login } from "../TinkeringRne/Component/Login";
import { name } from "../../../app.json";


export class ReactNativeApp implements App {
    
    public name = "react-native";

    public working = true;

    public bundle = null;

    public async run() {

        // console.log(window.rootTag);
        // console.log("unmounting");

        // AppRegistry.unmountApplicationComponentAtRootTag(window.rootTag);
        // console.log("unmounted");

        AppRegistry.registerComponent(name, () => () => <Login />);
        AppRegistry.runApplication(name, {});
        // AppRegistry.runApplication(this.name, {});
        // console.log("run");
    }
}
