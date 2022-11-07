import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface Props {
    activity: IActivity;
}

export default function ActivityDetails ({activity}: Props) {
    return(
        /** We will use cards to display the activity details */
        <Card>
            {/** Creating a dynamic string to receive the pictures */}
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>{activity.date}</Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths ='2'>
                    <Button basic color='blue' content ='Edit'></Button>
                    <Button basic color='blue' content ='Edit'></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}