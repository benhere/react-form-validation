import React, { useState } from 'react'
import './Form.css';
import useFormValidation from '../hooks/useFormValidation';

const validateForm = (values) => {
  let errors = {};

  // Add your validation logic
  
  if(!values.username.trim()){
    errors.username = 'Username is required'
  }else if(values.username.length < 3){
    errors.username = 'Username should be atleast 3 characters'
  }

  if(!values.email){
    errors.email = 'Email is required'
  }else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if(!values.password){
    errors.password = 'Password is required'
  }else if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,16}$/.test(values.password)){
    errors.password = 'Passwors must be 5 to 16 characters lenght'
  }

  return errors;
}

const Form = () => {
  const[isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = () => {
    setIsSubmitted(true);
  }

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormValidation(
      {
        username: "",
        email: "",
        password: "",
      },
      validateForm,
      submitForm
    );

  return (
    <>
      <h2 className="header">User Sign up Form</h2>
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-form">
            <label htmlFor="username">Enter your Username: </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              className="input-box"
              placeholder="Enter your username i.e, john"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="input-form">
            <label htmlFor="email">Enter your Email: </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              className="input-box"
              placeholder="Enter your email i.e, abc@example.com"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="input-form">
            <label htmlFor="password">Enter your Password: </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              className="input-box"
              placeholder="Enter your password in this form i.e, Abc@123"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div>
            <button
              className="btn-submit"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            {
              isSubmitted && (
                <div>
                  <h2 className='text-success'>Form submitted successfully!!</h2>
                </div>
              )
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;