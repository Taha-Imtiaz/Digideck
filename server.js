const express = require("express")
const quoteRouter = require("./routes/quotesRoute")

const PORT =8000

// server initialization
const app = express()

// middlewares
app.use(express.json())

// routes 
app.use("/api/v1/quotes", quoteRouter)

app.listen(PORT, () =>{
    console.log(`Server started on PORT ${PORT}`)
})