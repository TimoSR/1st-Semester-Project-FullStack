import React from 'react';
import { Button, Item, Label, List, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface Props {
    activities: IActivity[];
    selectActivity: (id: String) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities, deleteActivity, selectActivity}: Props) {
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
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                <Button onClick={() => deleteActivity(activity.id)} floated='right' content='delete' color='red'></Button>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content> 
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}