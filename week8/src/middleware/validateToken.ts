import {Request, Response, NextFunction} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv"
import { Topic, Itopic } from "../models/Topic"

dotenv.config()

export interface CustomRequest extends Request {
    user?: JwtPayload
}

export const validateUser = (req: CustomRequest, res: Response, next: NextFunction): void => {
    
    const token: string | undefined = req.header('authorization')?.split(" ")[1]

    if(!token) {
        res.status(401).json({message: "Token not found."})
        return
    }

    try {
        const verified: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        req.user = verified
        next()
    } catch (error: any) {
        res.status(401).json({message: "Access denied, bad token"})
    }
}

export const validateAdmin = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const topic = await Topic.findById(req.params.id);
    let topicUsername: String = '';
    if (topic) {
        topicUsername = topic.username;
    }
    if (await req.user?.isAdmin || req.user?.username == topicUsername) {
        next();
    } else {
        res.status(403).json({ message: "Access denied." });
    }
}