import mongoose, {Document, Schema} from "mongoose";

interface Itopic extends Document {
    title: string
    content: string
    username: string
    createdAt: Date
}

const topicSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Topic: mongoose.Model<Itopic> = mongoose.model<Itopic>("Topic", topicSchema)

export {Itopic, Topic}