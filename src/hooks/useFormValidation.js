import { useEffect, useState } from "react";
const useFormValidation = (initialState, validate, callback) => {

    const[values, setValues] = useState(initialState);
    const[errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const{ name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
        }
    }, [isSubmitting, errors, callback])

    return {values, errors, handleChange, handleSubmit, isSubmitting};
};

export default useFormValidation;