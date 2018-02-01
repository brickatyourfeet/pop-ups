const validate = (value, rules, connectedValue) => {
    let isValid = true
    for (let rule in rules){
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(value)
                break
            case 'minLength':
                isValid = isValid && lengthValidator(value, rules[rule])
                break
            case 'equalTo':
                isValid = isValid && equalityValidator(value, connectedValue[rule])
                break
            default: 
                isValid = true
        }
    }
    return isValid
}

const emailValidator = value => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)
}

const lengthValidator = (value, minLength) => {
    return value.length >= minLength
}

const equalityValidator = (value1, value2) => {
    return value1 === value2
}

export default validate