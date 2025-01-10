import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document {
    email: string
    password: string
    username: string
    isAdmin?: boolean
}

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema)

export {IUser, User}