import React, { Fragment, useEffect} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
// read import comments if they are highligted red, when working with ts
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);


  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app....' />

  return (
    /** Is a fragment */
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        /** Any with path plus something else will get rendered */
        path={'/(.+)'}
        render={() =>(
        <>
          {/** Using semantic ui for handling website layout */}
          <Navbar />
          {/** We need to give a margin to the top as navbar use a fixed top */}
          <Container style = {{marginTop: '7em'}}>
            <Switch>
                {/** exact, class / style will only be applied if location is matched */}
              <Route exact path='/' component={HomePage}/>
              <Route exact path='/activities' component={ActivityDashBoard}/>
              <Route path='/activities/:id' component={ActivityDetails}/>
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
              <Route path='/errors' component={TestErrors}/>
              <Route path='/server-error' component={ServerError}/>
              <Route path='/login' component={LoginForm}/>
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      )}
      />
    {/** Fragment endpoint */}
    </>
  );
}

/** It is important to make our components observers if we want them to observe store state  */
export default observer(App);