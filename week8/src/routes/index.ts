import { Request, Response, Router, NextFunction } from "express";
import { IUser, User } from "../models/User";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  validateUserRegister,
  validateUserLogin,
} from "../validators/inputValidation";
import { handleValidationErrors } from "../validators/handleInputValidationErrors";
import { validateUser, validateAdmin, CustomRequest } from "../middleware/validateToken";
import { Itopic, Topic } from "../models/Topic";

dotenv.config();

const router: Router = Router();

router.post(
  "/api/user/register",
  validateUserRegister, handleValidationErrors,
 async (req: Request, res: Response) => {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      res.status(403).json({ message: "Email already in use." });
    } else {
      const original_password = req.body.password;
      const hashed_password = bcrypt.hashSync(
        original_password,
        bcrypt.genSaltSync(10)
      );
      const new_user: IUser = new User({
        username: req.body.username,
        password: hashed_password,
        email: req.body.email
      });
      if (req.body.isAdmin) new_user.isAdmin=req.body.isAdmin
      await new_user.save();
      res.json(new_user);
    }
  }
);

router.post(
  "/api/user/login",
  validateUserLogin, handleValidationErrors,
  async (req: Request, res: Response) => {
    const existing_user = await User.findOne({ email: req.body.email });
    if (!existing_user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (bcrypt.compareSync(req.body.password, existing_user.password)) {
      const jwtPayload: JwtPayload = {
        _id: existing_user._id,
        username: existing_user.username,
        isAdmin: existing_user.isAdmin,
      };
      const token = jwt.sign(jwtPayload, process.env.SECRET as string);

      res.status(200).json({ success: true, token: token });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  }
);

router.get("/api/topics", async (req: Request, res: Response) => {
  const topics = await Topic.find();
  res.json({ topics });
});

router.post(
  "/api/topic",
  validateUser,
  async (req: CustomRequest, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }
    const topic: Itopic = new Topic({
      username: req.user?.username,
      title: title,
      content: content
    })
    await topic.save()
    res.json({message: "success"})
  }
);

router.delete("/api/topic/:id",
  validateUser, validateAdmin,
  async (req: CustomRequest, res: Response) => {
    try{
        const result = await Topic.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).json({ message: "Topic not found" });
      } else {
        res.status(200).json({ message: "Topic deleted successfully." }); 
      }
    } catch {res.status(404).json({ message: "Topic not found" });}
  }
)

router.post("/api/validate-token", validateUser, (req: CustomRequest, res: Response) => {
  res.status(200).json({ valid: true });
});

export default router;
