import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate: activities, loading} = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(clickEvent: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(clickEvent.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment>
            {/** We are using items to view the activities */}
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/** 
                                 * It is important that we use a lamda function for onClick event. 
                                 * As a regular function would trigger the moment we render it, 
                                 * as it parses an arugment to selectActivty
                                 * Where the lamda will wait on the onClick.  
                                 * */}
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                <Button
                                    name={activity.id} 
                                    /** Submitting and insure the target with loading is correct the activity */
                                    loading={loading && target === activity.id} 
                                    onClick={(clickEvent) => handleActivityDelete(clickEvent, activity.id)} 
                                    floated='right' 
                                    content='delete' 
                                    color='red' 
                                />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content> 
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})