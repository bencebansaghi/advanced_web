import {Request, Response, Router} from "express"
import { ITodo, IUser, User } from './models/User'

const router: Router = Router()

async function getUser(username: string): Promise<IUser | null> {
    return await User.findOne({ name: username });
}

router.post("/add", async (req: Request, res: Response) => {
    let existing_user: IUser | null
    let new_todo: ITodo | null
    try{
        existing_user = await getUser(req.body.name)
        new_todo = {
            todo: req.body.todo
        }
    } catch {
        console.log('Name or todo not in req')
        return
    }
    if (!existing_user){
        const newUser = new User({
            name: req.body.name,
            todos: [new_todo]
        });
        await newUser.save();
    } else {
        existing_user.todos.push(new_todo)
        existing_user.save()
    }
    res.json(`Todo added successfully for user ${req.body.name}.`)
})

router.get("/todos/:id", async (req: Request, res: Response) => {
    const existing_user = await getUser(req.params.id);
    if (existing_user) {
        const todoList: string[] = existing_user.todos.map(todo => todo.todo)
        res.json({ todos: todoList });
    } else {
        res.json({message:"User not found"})
    }
})

router.delete("/delete", async (req: Request, res: Response) =>{
    const deleted = await User.deleteOne(req.body.name)
    if (deleted.deletedCount==0){
        res.json({message:"User not found"})
    } else {
        res.json({message: "User deleted successfully."})
    }
})

router.put("/update", async (req: Request, res: Response)=>{
    const existing_user = await getUser(req.body.name);
    if (existing_user) {
        try{
            existing_user.todos = existing_user.todos.filter((todo) => todo.todo !== req.body.todo)
            existing_user.save()
            res.json({message:"Todo deleted successfully."})
        } catch {
            console.log('Todo not found')
        }
    } else {
        console.log(`Error during update`)
        res.json({message:"Something went wrong."})
    }
})

export default router