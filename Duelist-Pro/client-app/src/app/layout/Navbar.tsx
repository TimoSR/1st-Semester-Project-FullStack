import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Navbar() {

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/asset/logo.png" alt="logo" style={{marginRight: '100 px'}} />
                    Duelist Pro
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    {/** 
                     * As openForm expects and optional id
                     * We need to wrap it in its own function
                     * So we can add empty parameter
                     */}
                    <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )

}
