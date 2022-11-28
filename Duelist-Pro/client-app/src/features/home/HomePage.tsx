import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted content="Welcome to Coup'Create">
                    {/* <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Coup'Create */}
                </Header>
                {/* <Header as='h2' inverted content="Welcome to Coup'Create"></Header> */}
                <Button style={{marginTop: 25}} as={Link} to='/activities' size='huge' inverted>
                    Take me to the Activities!
                </Button>
            </Container>
        </Segment>
    )
}