import express from 'express'
import dotenv from 'dotenv'
import { getAccessToken } from './lib/auth.js'

dotenv.config()

const app = express()

// initiate -stk
// callback endpoint

app.post("/initiate", async (req, res) => {
    try {

        //phonenumber, amount, product_name
        //254769009184
        //250
        //"string"

        // const {phoneNumber, amount, productName} = req.body;

        // initiateSTK push
        // 1. Get access token
        const accessToken = await getAccessToken()



        res.json({
            success: true,
            accessToken
        })



    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message || "Failed to get access token"
        })
        
    }
})

app.listen(3000, () => console.log('Server started sucessfully!'))