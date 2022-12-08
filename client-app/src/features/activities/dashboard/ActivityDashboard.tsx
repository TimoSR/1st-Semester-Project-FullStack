import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';

/**  
 * There to ways to construct the paramaters in react.
 * Props: Props is a commen solutions, but it requires you to add the prop infront of the all calls. 
 * To solve we utilize destructuring ({activities}: Props), which will make our code more readable. 
*/
export default observer(function ActivityDashBoard() {

    const {activityStore} = useStore();
    /** Destructering the properties from the activityStore */
    // const {selectedActivity, editMode} = activityStore;

    useEffect(() => {
      /** HTTP request for the Activites in the backend */
      activityStore.loadActivities();
    }, [activityStore])
  
    if (activityStore.loadingInitial) return <LoadingComponent content="Fetching Data..." />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>

                {/** Is not used with routing */}

                {/* *
                 * Displayed when selecting an activity and not in editMode
                 */}
                {/* {(selectedActivity && !editMode) ?
                    <ActivityDetails /> : null} */}
                {/**
                 * Displayed when selecting edit mode
                 */}    
                {/* {(editMode) ?
                    <ActivityForm /> : null}  */}

                <ActivityFilters />

            </Grid.Column>
        </Grid>
    )
})