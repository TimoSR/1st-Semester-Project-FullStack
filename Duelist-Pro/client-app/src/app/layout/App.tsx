import React, { Fragment} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
// read import comments if they are highligted red, when working with ts
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();

  return (
    <Fragment>
      {/** Using semantic ui for handling website layout */}
      <Navbar />
      {/** We need to give a margin to the top as navbar use a fixed top */}
      <Container style = {{marginTop: '7em'}}>
        {/** exact, class / style will only be applied if location is matched */}
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/activities' component={ActivityDashBoard}/>
        <Route path='/activities/:id' component={ActivityDetails}/>
        <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
      </Container>
    </Fragment>
  );
}

/** It is important to make our components observers if we want them to observe store state  */
export default observer(App);