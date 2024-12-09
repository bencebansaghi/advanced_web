import express, {Express} from "express"
import path from "path"
import router from "./src/routes/index"
import morgan from "morgan"
import cors from 'cors'

const app: Express = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)

})