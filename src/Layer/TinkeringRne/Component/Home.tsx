import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, Body, Title, Right, Container, Header, Left, Button } from "native-base";
import { tinkeringRneSymbols } from "../Symbols";
import { reactInject } from "../../ProtocultureReactNative/Component/ReactInject";
import { TinkeringRneAppService } from "../Service/TinkeringRneAppService";


interface ComponentProps {

    appService: TinkeringRneAppService;
}

export type Props = ComponentProps;

class HomeComponent extends React.PureComponent<Props> {

    public render() {

        return <Container>
            <Header>
                <Left>

                    <Button 
                        transparent 
                        rounded
                        onPress={this.toggleMenu}
                    >
                        <Icon 
                            name="menu" 
                            size={22}
                        />
                    </Button>

                </Left>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>

                </Right>
            </Header>
        </Container>
    }

    private toggleMenu = () => {

        this.props.appService.toggleMenu();
    };
}

export const Home = reactInject(tinkeringRneSymbols.AppService, "appService", HomeComponent);
