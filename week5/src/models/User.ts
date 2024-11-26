import mongoose, { Document, Schema } from 'mongoose';

interface ITodo {
    todo: string;
    checked: boolean;
}

interface IUser extends Document {
    name: string;
    todos: ITodo[];
}

const TodoSchema: Schema = new Schema({
    todo: { type: String, required: true },
    checked: { type: Boolean, default: false}
});

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    todos: { type: [TodoSchema], required: true }
});

const Todo = mongoose.model<ITodo>('Todo', TodoSchema)
const User = mongoose.model<IUser>('User', UserSchema);

export { ITodo, IUser, Todo, User };