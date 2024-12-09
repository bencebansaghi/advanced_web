import {Request, Response, Router} from "express"
import bcrypt from 'bcrypt'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import { emails, IEmail } from "../models/Email"
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from "dotenv"
import { validateToken } from "../middleware/validateToken"

dotenv.config()

const router: Router = Router()

router.post("/api/user/register",
    body("email").trim().escape(),
    body("password").trim().escape(),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)
        if(!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json({errors: errors.array()});return
        }
        if (!req.body.email || !req.body.password) {
            res.status(400).json({message: "Email and password are required"});
            return;
        }
        const email: string = req.body.email

        if (emails.find(emailObj => emailObj.email === email)) {
            res.status(403).json({message: "email already in use"}); 
            return
        }
        
        const original_password: string = req.body.password

        const hashed_password = bcrypt.hashSync(original_password, bcrypt.genSaltSync(10))

        const new_email: IEmail = {
            email: email,
            password: hashed_password
        }
        emails.push(new_email)
        res.json({email: email, password: hashed_password})
})

router.get("/api/user/list", async (req: Request, res: Response) => {
    res.json(emails)
})

router.post("/api/user/login",
    body("email").trim().escape(),
    body("password").trim().escape(),
    async (req: Request, res: Response) => {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({message: "Email and password are required"});
            return;
        }
        const existingEmail: IEmail | undefined = emails.find(emailObj => emailObj.email === req.body.email)
        if (!existingEmail) { 
            res.status(401).json({"message":"Login failed"})
            return
        }
        if (bcrypt.compareSync(req.body.password,existingEmail.password)){
            const jwtPayload: JwtPayload = {
                email: existingEmail.email
            }
            const token = jwt.sign(jwtPayload, process.env.SECRET as string)

            res.status(200).json({success: true, token: token})
        } else {
            res.status(401).json({message: "Login failed"})
        }

    })

router.get("/api/private", validateToken, async (req: Request, res: Response)=>{
    res.status(200).json({message: "This is protected secure route!"})
})

export default router