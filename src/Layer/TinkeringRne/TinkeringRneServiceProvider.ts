import { ServiceProvider } from "protoculture";
import { Login } from "./Component/Login";


export class TinkeringRneServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureReactNativeRoot(Login);
    }
}
