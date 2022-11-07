import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
}

/**  
 * There to ways to construct the paramaters in react.
 * Props: Props is a commen solutions, but it requires you to add the prop infront of the all calls. 
 * To solve we utilize destructuring ({activities}: Props), which will make our code more readable. 
*/
export default function ActivityDashBoard({activities}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] &&
                <ActivityDetails activity={activities[0]} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
} 