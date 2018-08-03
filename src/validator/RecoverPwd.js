import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const passwordRec = (data) => {
    let errors = {};

    if(!validator.isEmail(data.email)) {
        errors.email = "Invalid email";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default passwordRec;