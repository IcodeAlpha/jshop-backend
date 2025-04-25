import express from 'express'
import dotenv from 'dotenv'

const app = express()

// initiate -stk
// callback endpoint

app.post("/initiate", (req, res) => {
    console.log("initiate endpoint hit")
})

app.listen(3000, () => console.log('Server started sucessfully!'))