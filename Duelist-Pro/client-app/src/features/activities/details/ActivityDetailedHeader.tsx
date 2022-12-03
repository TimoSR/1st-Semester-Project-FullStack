import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

const activityImageStyle ={
    filter: 'brightness(70%)',
    width: '100%',
    height: '700px'

};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '500%',
    height: 'auto',
    color: 'white'
}

interface Props {
    activity: IActivity
}

export default function ActivityDetailedHeader({activity} : Props) {
    return (

   
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/test.jpg`} fluid style={activityImageStyle}></Image>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header 
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{activity.date}</p>
                                <p>
                                    Hosted by <strong>X</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendence</Button>
                <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>Manage Event</Button>
            </Segment>
        </Segment.Group>

    )
}