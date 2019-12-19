import React from 'react';
import {withFormik, Form, Field} from 'formik';
import { __values } from 'tslib';

const NewForm = ({values}) => {

    return(
     <div>
        <Form>
           <label htmlFor="name">
               Name:
               <Field
                id="name"
                type="text"
                name="name"
                />
           </label>
           <label htmlFor="email">
            Email:
            <Field
                id="email"
                type="email"
                name="email"
            />
           </label>
           <label htmlFor="password">
            Password:
            <Field
                id="password"
                type="text"
                name="password"
            />
           </label>
           <label htmlFor="TermsofService">
            Agree to Terms of Service
            <Field 
                id="TermsofService"
                type="checkbox"
                name="TermsofService"
                checked={values.TermsofService}
            />
            <span className="checkmark" />
           </label>
           <button type="submit">Submit</button>

        </Form>  
     </div>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, TermsofService}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            TermsofService: false
        }
    }
})(NewForm);

export default Form;