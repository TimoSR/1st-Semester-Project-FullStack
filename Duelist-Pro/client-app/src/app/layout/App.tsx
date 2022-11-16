import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
// read import comments if they are highligted red, when working with ts
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';

function App() {

  /** Creating a hook for the activities */
  const [activities, setActivities] = useState<IActivity[]>([]);
  /** selectecActivity can be an Activity or undefined */
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    /** HTTP request for the Activites in the backend */
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      response.forEach(activity => {
        /**
         * Based on the format of the data, we change it to fit the date form. 
         * (We can inspect it in the Network repsonse from the server)
         * We split the date based on the T, and take the first part now two elements. 
         */
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      //console.log(response);
      /** Reversing the list so the newly added is displayed at the top */
      setActivities(activities.reverse());
      setLoading(false);
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
      : setActivities([...activities, {...activity, id: uuid()}}]);
    
    */

    /** 
     * We check for the pressence of an activity id.
     * If we did receive an ID we know we are updating an Activity.
     * If we did not receive an id we know we are creating an Activity.
     */

    setSubmitting(true);

    let activitiesArray: IActivity[] = [...activities];

    if (activity.id) {

      agent.Activities.update(activity).then(() => {

        // Filter creates an array without the activity that will be updated

        let sortedActivityArray: IActivity[] = activitiesArray.filter(x => x.id !== activity.id);

        // Adding the updated activity in the front of the array

        sortedActivityArray.unshift(activity);

        // Updating the set array

        setActivities(sortedActivityArray);

        setEditMode(false);
      
        setSelectedActivity(activity);

        setSubmitting(false);

      })
 
    } else {

      // Adding new activity to the array with a uuid ID

      activity.id = uuid();

      agent.Activities.create(activity).then(() => {

        activitiesArray = [...activities]

        activitiesArray.unshift(activity);

        setActivities(activitiesArray);

        setEditMode(false);
      
        setSelectedActivity(activity);

        setSubmitting(false);

      })

    }
    
  }

  function handleDeleteActivity(id: string){
    // creating a new list without the activity = deleting the activity

    setSubmitting(true);

    agent.Activities.delete(id).then(() => {

      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if (loading) return <LoadingComponent content="Fetching Data..." />

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
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;