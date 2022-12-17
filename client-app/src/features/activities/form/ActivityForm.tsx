import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import {v4 as uuid} from 'uuid';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { IActivity } from '../../../app/models/activity';


export default observer(function ActivityForm() {
    
    const history = useHistory();
    
    const {activityStore} = useStore();

    const { createActivity, 
            updateActivity, 
            loading,
            loadActivity,
            loadingInitial } = activityStore;

    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        date: Yup.string().required().nullable(),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required()
    })

    useEffect(() => {
        /** I use ! to remove the warning from activity */
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])


    function handleFormSubmit(activity: IActivity) {

        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };

            /** Creating the activity then redirecting  */
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))

        } else {

            /** Updating activity and redirecting */
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        /** 
         * Spreading the existing properties of the activity (copying the object in best manner)
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
         * Property with key of name is set to whatever the value is.
        */
        setActivity({...activity, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...' />

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                    {({handleSubmit, isValid, isSubmitting, dirty}) => (
                        /** We use the semantic UI styling for the formik form */
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput placeholder='Title' name='title' />
                            <MyDateInput
                                placeholderText='Date'
                                name='date'
                                showTimeSelect
                                timeCaption='time'
                                dateFormat='dd MMM yyyy h:mm aa'
                            />
                            <Header content='Location Details' sub color='teal' />
                            <MyTextArea rows={3} placeholder="Description" name="description" />
                            {/* <MyTextInput placeholder="Category" name="category" /> */}
                            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                            <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' color='grey' />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading} 
                                floated='right' 
                                color='blue' 
                                content='Submit'></Button>            
                        </Form>
                    )}
            </Formik>
        </Segment>
    )
})