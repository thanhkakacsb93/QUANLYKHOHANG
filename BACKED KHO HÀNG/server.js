import express, { json } from "express"
import "dotenv/config"
import mdwApiConnectToServer from "./middlewares/mdw.ApiConnecToServer.js"
import connectTodatabase from "./config/database.js"
import mdwerroHandler from "./middlewares/mdw.errorhandler.js"
import cors from "cors"
import RouterApp from "./routers/index.js"

const app = express()
app.use(express.json())
const PORT = process.env.PORT_SERVER

const whitelist = ["http://localhost:5173/"]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors("*"))
connectTodatabase()

// app.use(mdwApiConnectToServer)

app.use("/api/v1", RouterApp)

// app.use(mdwerroHandler)
app.listen(PORT, () => {
    console.log("server is running")
})