import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns';

interface Props {
    activity: IActivity;
}

export default function ActivityListItem({activity}: Props) {

    const {activityStore} = useStore();

    const {deleteActivity, loading} = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(clickEvent: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(clickEvent.currentTarget.name);
        deleteActivity(id);
    }

    return (

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={`/assets/categoryImages/test.jpg`} />
                        <Item.Content>
                                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                    {activity.title}
                                </Item.Header>
                                <Item.Description>Hosted by x</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment secondary>
                Attendes go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View' 
                />
                <Button
                    name={activity.id} 
                    /** Submitting and insure the target with loading is correct the activity */
                    loading={loading && target === activity.id} 
                    onClick={(clickEvent) => handleActivityDelete(clickEvent, activity.id)} 
                    floated='right' 
                    content='delete' 
                    color='red' 
                    />
            </Segment>
        </Segment.Group>


        // <Item key={activity.id}>
        //     <Item.Content>
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             {/** 
        //              * It is important that we use a lamda function for onClick event. 
        //              * As a regular function would trigger the moment we render it, 
        //              * as it parses an arugment to selectActivty
        //              * Where the lamda will wait on the onClick.  
        //              * */}
        //             {/**<Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>*/}
        //             <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue'></Button>
        //             <Button
        //                 name={activity.id} 
        //                 /** Submitting and insure the target with loading is correct the activity */
        //                 loading={loading && target === activity.id} 
        //                 onClick={(clickEvent) => handleActivityDelete(clickEvent, activity.id)} 
        //                 floated='right' 
        //                 content='delete' 
        //                 color='red' 
        //             />
        //             <Label basic content={activity.category}/>
        //         </Item.Extra>
        //     </Item.Content> 
        // </Item>
    )
}