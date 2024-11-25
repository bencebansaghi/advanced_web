import {Request, Response, Router} from "express"
import fs from "fs"

let filename="data.json"
const router: Router = Router()

type TUser = {
    name: string,
    todos: string[]
}

let users: TUser[] = []

async function readUsersFromFile() {
    try {
        const data = await fs.promises.readFile(filename, "utf8");
        users = JSON.parse(data);
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            await writeUsersToFile();
        } else {
            console.error(err);
        }
    }
}


async function writeUsersToFile() {
    try {
        await fs.promises.writeFile(filename, JSON.stringify(users));
    } catch (err) {
        console.error(err);
    }
}

router.post("/add", async (req: Request, res: Response) => {
    await readUsersFromFile()
    let added_user:string
    try{
        added_user = req.body.name
    }
    catch (err){
        console.error('Name not found in request')
        res.json(`Error parsing username: ${err}`)
        return
    }
    let todo: string
    try{
        todo = req.body.todo
    }
    catch (err){
        console.error(`Todo not found in request`)
        res.json(`Error parsing todo: ${err}`)
        return
    }
    let found = false
    for (const user of users) {
        if (user.name === added_user) {
            found = true;
            try {
                user.todos.push(todo);
                await writeUsersToFile();
            } catch (err) {
                console.error(`Error while trying to add todo to existing user: ${err}`);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        }
    }
    
    if (!found){
        let new_user: TUser = {
            name: added_user,
            todos: [todo]
        }
        users.push(new_user)
        await writeUsersToFile()
    }
    res.json(`Todo added successfully for user ${added_user}.`)
})

router.get("/todos/:id", async (req: Request, res: Response) => {
    await readUsersFromFile()
    const user = users.find((user) => user.name === req.params.id);
    if (user) {
        res.json({ todos: user.todos });
    } else {
        res.json({message:"User not found"})
    }
})

router.delete("/delete", async (req: Request, res: Response) =>{
    let username=req.body.username
    await readUsersFromFile()
    const index = users.findIndex((user) => user.name==username)
    if (index==-1){
        res.json({message:"User not found"})
    } else {
        users.splice(index)
        await writeUsersToFile()
        res.json({message: "User deleted successfully."})
    }
})

router.put("/update", async (req: Request, res: Response)=>{
    await readUsersFromFile()
    try{
        let username=req.body.name
        let todoname=req.body.todo
        const userIndex = users.findIndex((user) => user.name==username)
        const todoIndex = users[userIndex].todos.findIndex((todo) => todo==todoname)
        users[userIndex].todos.splice(todoIndex)
        await writeUsersToFile()
        res.json({message:"Todo deleted successfully."})
    } catch (err) {
        console.log(`Error during update: ${err}`)
        res.json({message:"Something went wrong."})
    }
})

export default router