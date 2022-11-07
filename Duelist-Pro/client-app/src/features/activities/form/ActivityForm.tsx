import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function ActivityForm() {
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title" />
                <Form.Input placeholder="Date" />
                <Form.Input placeholder="Description" />
                <Form.Input placeholder="Category" />
                <Button floated='right' type='button' content='Cancel' color='red' />
                <Button floated='right' color='blue' content='Submit'></Button>            
            </Form>
        </Segment>
    )
}
