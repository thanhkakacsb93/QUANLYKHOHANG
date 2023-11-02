import * as yup from "yup"

const schemmaShelves = yup.object().shape({
    CreatorId: yup.string().required(),
    NameShelves: yup.string().required()
})

const SchemaSupplies = yup.object().shape({
    CreatorId: yup.string().required(),
    NameShelves: yup.string(),
    NameSupplies: yup.string().required(),
    Quantity: yup.number().required(),
    Unit: yup.string().required(),
})

const schemmavalidationRepo = { schemmaShelves, SchemaSupplies }

export default schemmavalidationRepo