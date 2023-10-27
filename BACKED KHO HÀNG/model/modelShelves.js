import mongoose from "mongoose"

const schemaRepo = new mongoose.Schema({
    CreatorId: {
        type: String,
        required: true
    },
    NameShelves: {
        type: String,
        required: true
    }
})

const modelShelves = mongoose.model("Repo", schemaRepo)

export default modelShelves