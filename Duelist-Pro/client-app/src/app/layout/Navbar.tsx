import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function Navbar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/asset/logo.png" alt="logo" style={{marginRight: '100 px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )

}
