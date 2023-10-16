import * as yup from "yup"



const signup = yup.object().shape({
    Username: yup.string().required(),
    Password: yup.string().required().min(4),
    Role: yup.string().required().oneOf(['admin', 'member']),
    Keyresetpassword: yup.string().required(),
    Expiry: yup.date().required()
})

const login = yup.object().shape({
    Username: yup.string().required(),
    Password: yup.string().required().min(4)
})
const schemmavalidation = { login, signup }
export default schemmavalidation