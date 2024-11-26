import mongoose, { Document, Schema } from 'mongoose';

interface ITodo {
    todo: string;
}

interface IUser extends Document {
    name: string;
    todos: ITodo[];
}

const TodoSchema: Schema = new Schema({
    todo: { type: String, required: true }
});

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    todos: { type: [TodoSchema], required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);

export { ITodo, IUser, User };