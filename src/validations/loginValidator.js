import isEmpty from 'lodash/isEmpty';
import validator from 'validator';

export default function validateInput(data){
    let errors = {};

    if(validator.isEmpty(data.username)){
        errors.username = "O Campo Usuario nao pode ser nulo";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "O Campo password nao pode ser nulo";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}