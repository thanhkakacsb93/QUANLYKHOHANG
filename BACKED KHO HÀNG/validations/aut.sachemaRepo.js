import * as yup from "yup"

const schemmaRepo = yup.object().shape({
    creatorId: yup.string().required(),
    nameShelves: yup.string(),

})