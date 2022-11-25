import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();

    /** Used before router */

    // const { selectedActivity, 
    //         closeForm, 
    //         createActivity, 
    //         updateActivity, 
    //         loading } = activityStore;

    const { createActivity, 
            updateActivity, 
            loading,
            loadActivity,
            loadingInitial } = activityStore;

    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: ''
    });

    useEffect(() => {
        /** I use ! to remove the warning from activity */
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleSumit() {

        activity.id ? updateActivity(activity) : createActivity(activity);

    }

    /** Used before routing */

    // /** If activity is null or undefined, we initilize an empty activity */
    // const initialState = selectedActivity ?? {
    //     id: '',
    //     title: '',
    //     category: '',
    //     description: '',
    //     date: ''
    // }

    // const [activity, setActivity] = useState(initialState);

    if(loadingInitial) return <LoadingComponent content='Loading activity...' />

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        /** 
         * Spreading the existing properties of the activity (copying the object in best manner)
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
         * Property with key of name is set to whatever the value is.
        */
        setActivity({...activity, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSumit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
                <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' color='grey' />
                <Button loading={loading} floated='right' color='blue' content='Submit'></Button>            
            </Form>
        </Segment>
    )
})