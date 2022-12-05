import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function HomePage() {
    const {userStore} = useStore();
    return (
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted content="Welcome to Coup'Create">
                    {/* <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Coup'Create */}
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        {/* <Header as='h2' inverted content="Welcome to Coup'Create" /> */}
                        <Button style={{marginTop: 25}} as={Link} to='/activities' size='huge' inverted>
                            Go to Activities
                        </Button>
                    </>
                ) : (
                    <Button style={{marginTop: 25}} as={Link} to='/login' size='huge' inverted>
                        Login
                    </Button>
                )}
                
            </Container>
        </Segment>
    )
})