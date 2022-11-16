import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
// read import comments if they are highligted red, when working with ts
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore();

  /** Creating a hook for the activities */
  const [activities, setActivities] = useState<Activity[]>([]);
  /** selectecActivity can be an Activity or undefined */
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    /** HTTP request for the Activites in the backend */
    activityStore.loadActivities();
  }, 
  /** The dependencies of the use effect */
  [activityStore])

  function handleCreateOrEditActivity(activity: Activity){
    
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

    let activitiesArray: Activity[] = [...activities];

    if (activity.id) {

      agent.Activities.update(activity).then(() => {

        // Filter creates an array without the activity that will be updated

        let sortedActivityArray: Activity[] = activitiesArray.filter(x => x.id !== activity.id);

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

  if (activityStore.loadingInitial) return <LoadingComponent content="Fetching Data..." />

  return (
    <Fragment>
      {/** Using semantic ui for handling website layout */}
      <Navbar />
      {/** We need to give a margin to the top as navbar use a fixed top */}
      <Container style = {{marginTop: '7em'}}>
        {/* <h2>{activityStore.testTitle}</h2>
        <Button content='Add exclamation' positive onClick={activityStore.setTitle} /> */}
        {/** Listing the array received from the backend, by using the ActivityDashBoard */}
        <ActivityDashBoard 
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

/** It is important to make our components observers if we want them to observe store state  */
export default observer(App);