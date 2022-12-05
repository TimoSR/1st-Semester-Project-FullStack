import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default observer (function RegisterForm(){

    const {userStore, modalStore} = useStore();

    return (
        <Formik
            initialValues={{username: '', displayname: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => setErrors({error: 'Invalid email or password'}))}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                password: Yup.string().required(),
                email:Yup.string().required().email()
            })}
        >

            {/** 
             * This prop checks if our form has been touched or not. We can use this to disable our submit button when the form loads initially. 
             * Returns true if there are no errors (i.e. the errors object is empty) and false otherwise.
             * */}
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                 <Header as='h2' color='teal' content='' textAlign='center' />
                <MyTextInput name='username' placeholder='Username'/>
                <MyTextInput name='displayname' placeholder='Optional: Name'/>
                <MyTextInput name='email' placeholder='Email' type='email'/>
                <MyTextInput name='password' placeholder='Password' type='password'/>
                <ErrorMessage
                    name='error'
                    render={() => <Label style={{marginBottom: 10}} color='red' content={errors.error}/>}
                />
                <Button 
                    disabled={!isValid || !dirty || isSubmitting}
                    loading={isSubmitting} 
                    positive content='Register' 
                    type='submit' 
                    fluid/>
                <Button 
                    style={{marginTop: 10}} 
                    as={Link} to='/' 
                    onClick={() => modalStore.closeModal()} 
                    content='Cancel' 
                    color='red' 
                    fluid/>
        </Form>
        )}

    </Formik>
    )
})