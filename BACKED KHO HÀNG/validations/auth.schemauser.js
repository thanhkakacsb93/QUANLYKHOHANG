import * as yup from "yup"



const schemasignup = yup.object().shape({
    Username: yup.string().required(),
    Password: yup.string().required().min(4),
    Role: yup.string().required().oneOf(['admin', 'member']),
    Keyresetpassword: yup.string().required()
})

const schemalogin = yup.object().shape({
    Username: yup.string().required(),
    Password: yup.string().required().min(4)
})
const schemmavalidation = { schemalogin, schemasignup }
export default schemmavalidation