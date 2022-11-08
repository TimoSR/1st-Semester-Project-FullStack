import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  /** Creating a hook for the activities */

  const [activities, setActivies] = useState<IActivity[]>([]);

  /** selectecActivity can be an Activity or undefined be a */
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);

  /** HTTP request for the Activites in the backend */

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:7032/api/Activities').then(response => {
      //console.log(response);
      setActivies(response.data);
    })
  }, [])

  function handleSelectActivity(id: String) {
    /** Looking for the activity set as the id param */
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  return (
    <Fragment>
      {/** Using semantic ui for handling website layout */}
      <Navbar />
      {/** We need to give a margin to the top as navbar use a fixed top */}
      <Container style = {{marginTop: '7em'}}>
        {/** Listing the array received from the backend, by using the ActivityDashBoard */}
        <ActivityDashBoard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;