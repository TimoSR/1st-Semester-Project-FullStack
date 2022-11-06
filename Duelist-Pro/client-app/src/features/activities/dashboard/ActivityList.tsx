import React from 'react';
import { Button, Item, Label, List, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface Props {
    activities: IActivity[];
}

export default function ActivityList({activities}: Props) {
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
                                <Button floated='right' content='View' color='blue'></Button>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content> 
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}