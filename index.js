import express from 'express'
import dotenv from 'dotenv'
import { getAccessToken } from './lib/auth.js'
import { stkPush } from './lib/stkPush.js'
import prisma from './lib/db.js'

dotenv.config()

const app = express()
app.use(express.json())

// initiate -stk
app.post("/initiate", async (req, res) => {
    try {

        const {phoneNumber, amount, productName} = req.body;
        // Database logic to store the transaction details
        // TABLE: Transaction
        // Status be pending

        // initiateSTK push
        // 1. Get access token
        const accessToken = await getAccessToken()

        // 2. Initiate STK push
        const initiateStkResponse = await stkPush(accessToken, phoneNumber, amount, productName)

       


        res.json({
            success: true,
            initiateStkResponse
        })



    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message || "Failed to get access token"
        })
        
    }
})

// callback endpoint
app.post("/callback", async (req, res) => {
    try {

        const stkCallbackData = req.body.Body;

        let status = null
        if(stkCallbackData.ResultCode === 0) {
           status = "SUCCESS" 
        } else {
            status = "FAILED"
        }

        // Database Logic to update the transaction status.
        prisma.transaction.update({
            where: {
                CheckoutRequestID: stkCallbackData.CheckoutRequestID
            },
            data: {
                status: status
            }
        })

        res.json({status, stkCallbackData})
        
    } catch (error) {
        res.status(500).json({error: 'something went wrong'})
    }
})

app.listen(3000, () => console.log('Server started sucessfully!'))