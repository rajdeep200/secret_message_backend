import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connect } from "./utils/db.js";
import { postgresDatabase } from "./config/config.js";
import { userRoutes } from "./routers/userRouter.js";
connect(postgresDatabase)

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})