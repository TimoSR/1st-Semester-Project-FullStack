import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { IActivity } from '../models/activity';

interface Props {
    openForm: (id: string) => void;
}

export default function Navbar({openForm}: Props) {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/asset/logo.png" alt="logo" style={{marginRight: '100 px'}} />
                    Duelist Pro
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button OnClick={() => openForm} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )

}
