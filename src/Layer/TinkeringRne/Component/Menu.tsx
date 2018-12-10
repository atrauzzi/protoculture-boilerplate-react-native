import React from "react";
import { reactInject } from "../../ProtocultureReactNative/Component/ReactInject";
import { Container, Content, Button, Text } from "native-base";
import { tinkeringRneSymbols } from "../Symbols";
import { UsesEventBus } from "../../ProtocultureReactNative/Component/WithEventBus";
import { SessionService } from "../Service/SessionService";


interface ComponentProps {

    sessionService: SessionService;
}

export type Props = ComponentProps & UsesEventBus;

export class MenuComponent extends React.PureComponent<Props> {

    public render() {

        return <Container>
            
            <Content>
                
                <Button
                    onPress={this.logout}
                >
                    <Text>Logout</Text>
                </Button>

            </Content>

        </Container>
    }

    private logout = async () => {
        
        this.props.sessionService.end();
    }
}

export const Menu = reactInject(tinkeringRneSymbols.SessionService, "sessionService", MenuComponent);
