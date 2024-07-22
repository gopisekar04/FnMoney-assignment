const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const {Users}  = require('./db')
// const {authMiddleware} = require('./middleware')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')
const z = require("zod")

const signupSchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6)
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

app.post('/api/v1/signup', async(req, res) => {
    const body = req.body
    const {success} = signupSchema.safeParse(body)
    if(!success){
        res.json({
            error: "Incorrect inputs"
        })
        return
    }

    const existingUser = await Users.findOne({
        email: body.email
    })

    if(existingUser){
        res.json({
            error: "Email already exist"
        })
    }else{
        const newUser = await Users.create(body)
        res.json({
            message: "Signup Successful"
        })        
    }
})

app.post("/api/v1/signin", async(req, res) => {
    const body = req.body
    const { success } = loginSchema.safeParse(body)

    if(!success){
        res.json({
            error: "Invalid inputs"
        })
    }

    const user = await Users.findOne({
        email: body.email,
        password: body.password
    })

    if(user){
        const jwtToken = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        
        res.json({
            jwtToken
        })
    }else{
        res.status(411).json({
            error: "Email/ password is incorrect "
        })
    }

})




app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})