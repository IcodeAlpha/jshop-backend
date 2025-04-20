import express from 'express'
import dotenv from 'dotenv'

const app = express()

// initiate -stk
// callback endpoint

app.post("/initiate", (req, res) => {
    try {

        //phonenumber, amount, product_name
        //254769009184
        //250
        //"string"

        const {phoneNumber, amount, productName} = req.body;
    } catch (error) {
        
    }
})

app.listen(3000, () => console.log('Server started sucessfully!'))