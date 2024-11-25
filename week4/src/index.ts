import {Request, Response, Router} from "express"
import fs from "fs"

let filename="data.json"
const router: Router = Router()

type TUser = {
    name: string,
    todos: string[]
}

let users: TUser[] = []

fs.readFile(filename, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        if (err.code=='ENOENT'){
            writeUsersToFile()
        } else{
            console.error(err)
        }
        return
    }
    try {
        users = JSON.parse(data)
        return
    } catch (error: any) {
        console.error(`Error parsing JSON: ${error}`)
        return
    }
})

function writeUsersToFile() {
    fs.writeFile(filename, JSON.stringify(users), (err) => {
        console.error(err)
    })
}

router.post("/add", (req: Request, res: Response) => {
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
    users.forEach( function(user) {
        if (user.name===added_user){
            found = true
            try{
                user.todos.push(todo)
                writeUsersToFile()
            }
            catch (err){
                console.error(`Error while trying to add todo to existing user: ${err}`)
                return
            }
        }
    })
    if (!found){
        let new_user: TUser = {
            name: added_user,
            todos: [todo]
        }
        users.push(new_user)
        writeUsersToFile()
    }
    res.json(`Todo added successfully for user ${added_user}.`)
})

router.get("/todos/:id", (req: Request, res: Response) => {
    let found = false
    users.forEach( function(user){
        if (user.name==req.params.id){
            found = true
            res.json({todos:user.todos})
        }
    })
    if (!found){
        let names:string="";
        users.forEach(function(user){
            names+=user.name
        })
        res.json({message:"User not found"})
    }
})

router.delete("/delete", (req: Request, res: Response) =>{
    let username=req.body.username
    const index = users.findIndex((user) => user.name==username)
    if (index==-1){
        res.json({message:"User not found"})
    } else {
        users.splice(index)
        writeUsersToFile()
        res.json({message: "User deleted successfully."})
    }
})

router.put("/update", (req: Request, res: Response)=>{
    try{
        let username=req.body.name
        let todoname=req.body.todo
        const userIndex = users.findIndex((user) => user.name==username)
        const todoIndex = users[userIndex].todos.findIndex((todo) => todo==todoname)
        users[userIndex].todos.splice(todoIndex)
        writeUsersToFile()
        res.json({message:"Todo deleted successfully."})
    } catch (err) {
        console.log(`Error during update: ${err}`)
        res.json({message:"Something went wrong."})
    }
})

export default router