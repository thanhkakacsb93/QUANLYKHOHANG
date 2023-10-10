import mongoose from "mongoose"

const URL = process.env.URL_MONGOOSE
const connectTodatabase = async () => {
    try {
        const connectDTB = await mongoose.connect(URL);
        console.log("connect to database successfully")

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
export default connectTodatabase