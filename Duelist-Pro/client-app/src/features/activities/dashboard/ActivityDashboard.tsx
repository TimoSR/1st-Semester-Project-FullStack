import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    /** as it is a function we need to give the return type */
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

/**  
 * There to ways to construct the paramaters in react.
 * Props: Props is a commen solutions, but it requires you to add the prop infront of the all calls. 
 * To solve we utilize destructuring ({activities}: Props), which will make our code more readable. 
*/
export default observer(function ActivityDashBoard({activities, createOrEdit, deleteActivity, submitting}: Props) {

    const {activityStore} = useStore();
    /** Destructering the properties from the activityStore */
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities}
                deleteActivity={deleteActivity}
                submitting={submitting}
            />
            </Grid.Column>
            <Grid.Column width='6'>
                {/**
                 * Displayed when selecting an activity and not in editMode
                 */}
                {(selectedActivity && !editMode) ?
                    <ActivityDetails /> : null}
                {/**
                 * Displayed when selecting edit mode
                 */}    
                {(editMode) ?
                    <ActivityForm 
                    createOrEdit={createOrEdit} 
                    submitting={submitting}/> : null} 
            </Grid.Column>
        </Grid>
    )
})