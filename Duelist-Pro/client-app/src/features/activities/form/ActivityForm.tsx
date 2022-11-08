import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface Props {
    activity: IActivity | undefined;
    closeForm: () => void;
}

export default function ActivityForm({activity, closeForm}: Props) {
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title" />
                <Form.Input placeholder="Date" />
                <Form.Input placeholder="Description" />
                <Form.Input placeholder="Category" />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' color='red' />
                <Button floated='right' color='blue' content='Submit'></Button>            
            </Form>
        </Segment>
    )
}
