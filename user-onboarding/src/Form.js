import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field, Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const NewForm = ({values, errors, touched, status}) => {

    const [users, setNewUser] = useState([]);

    useEffect(() => {
        console.log('status changed:', status)
        status && setNewUser(users => [...users, status])

    },[status])

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

    {touched.name && errors.name && (<p>{errors.name}</p>)}

           <label htmlFor="email">
            Email:

            <Field
                id="email"
                type="email"
                name="email"
            />
           </label>

            {touched.email && errors.email && (<p> {errors.email} </p>) }

           <label htmlFor="password">
            Password:

            <Field
                id="password"
                type="text"
                name="password"
            />
           </label>

            {touched.password && errors.password && (<p> {errors.password} </p>)}

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

    {touched.TermsofService && errors.TermsofService && (<p> {errors.TermsofService} </p>)}

           <button type="submit">Submit</button>
        </Form>  

        {users.map(user => (
	  <div key={user.id}>
	    <h1>Name: {user.name}</h1>
	    <h3>email: {user.email}</h3>
	    <h3>Agreed to Terms: {user.TermsofService.toString()}</h3>
	  </div>
	))}


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
    
},
// VALIDATION SCHEMA


validationSchema: Yup.object().shape({
    name: Yup.string()
    .min(3)
    .required("This is a required field!"),
    email: Yup.string()
    .email("Email is not valid.")
    .required("This is a required field!"),
    password: Yup.string()
    .min(6)
    .required("This is a required field!"),
    TermsofService: Yup.boolean()
    .oneOf([true], "Must accept terms.")
}),

handleSubmit(values, { resetForm, setStatus }) {
    console.log("submitting:", values);
    axios.post("https://reqres.in/api/users", values)
        .then((response)=> {
            console.log("This is response data:", response.data)
            setStatus(response.data);
            resetForm();
        })
        .catch((error)=> {
            console.log("This is an async error:", error)
        })


}

})(NewForm);

export default FormikUserForm;