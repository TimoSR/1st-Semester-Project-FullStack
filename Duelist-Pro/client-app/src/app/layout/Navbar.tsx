import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function Navbar() {

    /** Used before reouting */
    // const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/asset/logo.png" alt="logo" style={{marginRight: '100 px'}} />
                    Coup'Create
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    {/** 
                     * As openForm expects and optional id
                     * We need to wrap it in its own function
                     * So we can add empty parameter
                     */}
                    {/** <Button onClick={() => activityStore.openForm()} positive content="Create Activity" /> */}
                    <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )

}
