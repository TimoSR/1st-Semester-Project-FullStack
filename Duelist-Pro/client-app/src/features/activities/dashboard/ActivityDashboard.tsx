import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
    selectedActivity: IActivity | undefined;
    /** as it is a function we need to give the return type*/
    selectActivity: (id: String) => void;
    cancelSelectActivity: () => void;
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
        cancelSelectActivity    }: Props) {

    return (

        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}
            />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity} 
                />}
                <ActivityForm />
            </Grid.Column>
        </Grid>

    )
} 