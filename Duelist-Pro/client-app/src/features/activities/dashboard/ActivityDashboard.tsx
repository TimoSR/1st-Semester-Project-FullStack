import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

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
                <List>
                    {activities.map((activity) => (
                        <List.Item key={activity.id}>
                            {activity.title}
                        </List.Item>
                    ))}
                </List>
            </Grid.Column>
        </Grid>
    )
}