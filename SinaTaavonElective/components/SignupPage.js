import React, { Component } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    render() {
        return (
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={this.LeftContent} />
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        );
    }
}

export default SignupPage;