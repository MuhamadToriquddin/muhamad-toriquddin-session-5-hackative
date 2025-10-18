import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import express from "express"
import "dotenv/config"
import imageRoutes from "./routes/image-routes.js"
import textRoutes from "./routes/text-routes.js"
import docRoutes from "./routes/doc-routes.js"
import audioRoutes from "./routes/audio-routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

app.use("/generate-text",textRoutes)

// app.use("/generate-from-image",imageRoutes)

app.use("/generate-from-document",docRoutes)

// app.use("/generate-from-audio",audioRoutes)

app.use(express.static(path.join(__dirname,'public')))

app.listen(process.env.PORT,()=>{
    console.log(`Server berjalan di port: ${process.env.PORT}`)
})