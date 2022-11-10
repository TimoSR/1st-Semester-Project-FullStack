import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  /** Creating a hook for the activities */
  const [activities, setActivities] = useState<IActivity[]>([]);
  /** selectecActivity can be an Activity or undefined */
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);


  useEffect(() => {
    /** HTTP request for the Activites in the backend */
    axios.get<IActivity[]>('https://localhost:7032/api/Activities').then(response => {
      //console.log(response);
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: String) {
    /** Looking for the activity set as the id param */
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    /** 
     * If the id os provided
     * handleSelectActivity is triggered.
     * If not, the handleCancelSelectActivity is triggered. 
    */
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: IActivity){
    
    /** Alternative code with the tenary operator can replace all the logic below 
     
     activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id)]) 
      : setActivities([...activities, activity]);
    
    */

    /** 
     * We check for the pressence of an activity id.
     * If we did receive an ID we know we are updating an Activity.
     * If we did not receive an id we know we are creating an Activity.
     */


    const activitiesArray: IActivity[] = [...activities];

      if (activity.id !== null) {

      // Filter creates an array without the activity that will be updated

      const sortedActivityArray: IActivity[] = activitiesArray.filter(x => x.id !== activity.id);

      // Adding the updated activity in the front of the array

      sortedActivityArray.unshift(activity);

      // Updating the set array

      setActivities(sortedActivityArray);

    } else {

      // Adding the new array in the front of the array

      activitiesArray.unshift(activity);

      setActivities(activitiesArray);

    }

    setEditMode(false);
      
    setSelectedActivity(activity);
    
  }

  return (
    <Fragment>
      {/** Using semantic ui for handling website layout */}
      <Navbar openForm={handleFormOpen} />
      {/** We need to give a margin to the top as navbar use a fixed top */}
      <Container style = {{marginTop: '7em'}}>
        {/** Listing the array received from the backend, by using the ActivityDashBoard */}
        <ActivityDashBoard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;