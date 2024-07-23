const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const {Users, Assessments}  = require('./db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')
const z = require("zod")
const bcrypt = require("bcrypt")
const authMiddleware  = require('./middleware')

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
        return res.status(400).json({
            error: "Email already exist"
        })
    }
    const {firstName, lastName, email, password} = body;
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
    res.json({
        message: "Signup Successful"
    })        
})

app.post("/api/v1/login", async(req, res) => {
    const body = req.body
    const {success} = loginSchema.safeParse(body)

    if(!success){
        res.json({
            error: "zod Invalid inputss"
        })
        return
    }

    const user = await Users.findOne({
        email: body.email,        
    })

    if(user){
        const isPasswordValid = await bcrypt.compare(body.password, user.password)
        if(!isPasswordValid){
            res.status(411).json({
                error: "Invalid password"
            })
            return
        }     
    }
    

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

app.post("/api/v1/publish",authMiddleware, async(req, res)=>{
    const { title, description, githublink, publishlink } = req.body;


    try {        
        
        const result = await Assessments.create({
            title,
            description,
            githublink,
            publishlink,
            authorId: req.userId,        
        })

        console.log(result);

        

        res.status(201).json({ message: 'Assessment published successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Error publishing assessment' });
    }

})



app.get("/api/v1/assessments", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId; 
        const assessments = await Assessments.find({ authorId: userId });

        if (assessments.length === 0) {
            return res.status(404).json({ message: 'No assessments found for this user' });
        }

        res.status(200).json({ assessments });
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ error: 'Failed to fetch assessments', details: error.message });
    }
});




app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})