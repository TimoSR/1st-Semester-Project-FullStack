import React from 'react';
import {useField,} from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

/** Partial Props is all optional */

export default function MyTextInput(props: Partial<ReactDatePickerProps>) {
    /** Telling the props we know that we will receive a name with ! */
    const [field, meta, helpers] = useField(props.name!);
    return(
        /** !! converts meta to a boolean if there is a error or undefined */       <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )

}