export const validateEmail = (val) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
}

export const validateNoNumbers = (val) => {
    const re = /^[a-zA-ZÀ-ž]+$/;
    return re.test(val);
}

export const validateOnlyNumbers = (val) => {
    const re = /^\+?\d+$/;
    return re.test(val)
}
