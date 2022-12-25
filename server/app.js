const express = require("express")
const mongoose = require("mongoose")
const config = require ("config")
const chalk = require ("chalk")
const routes = require("./routes")
const cors = require ("cors")
const initDatabase = require("./startUp/initDatabase")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api", routes)
app.use(errorHandler)

const PORT = config.get("port") ?? 8080

async function start() {
    try {
        // todo: после develop удалить!
        mongoose.connection.once("open", () => {
            initDatabase()
        })
        await mongoose.connect(config.get("mongoUri"))
        console.log(chalk.green("MongoDB connected"))
        app.listen(PORT, () =>
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        )
    } catch(e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()

