import mongoose from "mongoose"

const schemaUser = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        uique: true
    },
    Password: {

    },
    Role: {
        type: String,
        default: "member",
    },
    Keyresetpassword: {
        type: String,
        required: true
    },
    Expiry: {
        type: Date,
        required: true
    }

})
// schemaUser.collection = function () {
//     return `${this.Username}`;
// };

const modelUser = mongoose.model("DATAUSERS", schemaUser)


export default modelUser