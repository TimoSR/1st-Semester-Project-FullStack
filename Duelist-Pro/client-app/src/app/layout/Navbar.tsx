import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer (function Navbar() {

    /** Used before reouting */
    // const {activityStore} = useStore();

    const {userStore: {user, logout}} = useStore();

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
                <Menu.Item position='right'>
                    <Image src={user?.image || 'assets/categoryImages/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My Profile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )

})
