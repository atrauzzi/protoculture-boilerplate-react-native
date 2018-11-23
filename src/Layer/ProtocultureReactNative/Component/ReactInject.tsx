import React from "react";
import { Bundle } from "protoculture";


const { Provider , Consumer } = React.createContext<Bundle | null>(null);

export const BundleProvider = Provider;
export const BundleConsumer = Consumer;

export function reactInject<InjectedType, InjectionProp extends (string | number | symbol), Props extends {[key in InjectionProp]: InjectedType}>(symbol: symbol, injectionPropOrComponentType: InjectionProp | React.ComponentType<Props>, componentType: React.ComponentType<Props> = null) {

    const injectionProp = componentType
        ? injectionPropOrComponentType as string
        : symbol.toString().slice(7, -1);

    const Component = componentType || injectionPropOrComponentType as React.ComponentType<Props>;

    return function ComponentWithInjection(props: any) {

        return <BundleConsumer>
        {
            (bundle) => {

                if (!bundle) {

                    throw new Error("This portion of the React component graph is built using protoculture-react.  Please be sure to wrap it with a `BundleProvider`.");
                }

                return <Component
                    {...props}
                    {...{
                        [injectionProp]: bundle.container.get<InjectedType>(symbol),
                    }}
                />
            }
        }
        </BundleConsumer>;
    };
}
