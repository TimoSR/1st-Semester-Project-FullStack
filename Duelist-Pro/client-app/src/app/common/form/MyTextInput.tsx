import React from 'react';
import {useField} from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    type?: string;
    /** Optional label */
    label?: string;
}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return(
        /** !! converts meta to a boolean if there is a error or undefined */       <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )

}