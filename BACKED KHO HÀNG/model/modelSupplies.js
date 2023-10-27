import mongoose from "mongoose"

const schemaSupplies = new mongoose.Schema({
    CreatorId: {
        type: String,
        required: true
    },
    NameShelves: {
        type: String,
        required: true
    },
    NameSupplies: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Unit: {
        type: String,
        required: true
    }

})

const modelSupplies = mongoose.model("DataSupplies", schemaSupplies)

export default modelSupplies