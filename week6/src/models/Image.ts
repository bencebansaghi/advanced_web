import mongoose, {Document, Schema} from "mongoose";

interface IImage extends Document {
    filename: string
    path: string
    _id: string
}

const imageSchema = new Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true}
})

const Image: mongoose.Model<IImage> = mongoose.model<IImage>("Image", imageSchema)

export {Image, IImage}