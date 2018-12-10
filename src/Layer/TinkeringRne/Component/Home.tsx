import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, Body, Title, Right, Container, Header, Left, Button } from "native-base";


class HomeComponent extends React.PureComponent {

    public render() {

        return <Container>
            <Header>
                <Left>

                    <Button transparent rounded>
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
}

export const Home = HomeComponent;
