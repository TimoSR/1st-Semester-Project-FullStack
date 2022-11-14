import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
    selectedActivity: IActivity | undefined;
    /** as it is a function we need to give the return type */
    selectActivity: (id: String) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

/**  
 * There to ways to construct the paramaters in react.
 * Props: Props is a commen solutions, but it requires you to add the prop infront of the all calls. 
 * To solve we utilize destructuring ({activities}: Props), which will make our code more readable. 
*/
export default function ActivityDashBoard(
    {   activities, 
        selectedActivity, 
        selectActivity, 
        cancelSelectActivity,
        editMode,
        openForm,
        closeForm,
        createOrEdit,
        deleteActivity,
        submitting   }: Props) {

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
            />
            </Grid.Column>
            <Grid.Column width='6'>
                {/**
                 * Displayed when selecting an activity and not in editMode
                 */}
                {(selectedActivity && !editMode) ?
                    <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm} /> : null}
                {/**
                 * Displayed when selecting edit mode
                 */}    
                {(editMode) ?
                    <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity}
                    createOrEdit={createOrEdit} 
                    submitting={submitting}/> : null} 
            </Grid.Column>
        </Grid>
    )
} 