import {Request, Response, Router} from "express"
import fs from "fs"

const router: Router = Router()

type TUser = {
    name: string,
    email: string
}
let users: TUser[] = []

fs.readFile("data/users.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        console.error(err)
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
    fs.writeFile("data/users.json", JSON.stringify(users), (err) => {
        console.error(err)
    })
}

router.post("/users", (req: Request, res: Response) => {
    let user: TUser
    try{
        user = {
            name: req.body.name,
            email: req.body.email
        };
    }
    catch{
        console.error('Request not in the right format')
        res.json("Request not in the right format")
        return
    }
    if (users === null || users instanceof Error) {
        console.error('Error while fetching users')
        res.json("Error while fetching users")
        return
    }
    else {
        users.push(user)
        try {
            writeUsersToFile()
            res.json("User successfully added")
        }
        catch {
            res.json("Error while adding users")
            console.error("Error while adding users")
        }
    }
    
})

router.get("/users", (req: Request, res: Response) => {
    res.status(201)
    res.json(users)
})

router.get("/echo/:id", (req: Request, res: Response) => {
    res.json({ id: req.params.id })
})

router.post("/sum", (req: Request, res: Response) => {
    const numbers:number[] = req.body.numbers
    if (numbers) {
        res.json({ sum: numbers.reduce((partialSum, a) => partialSum + a, 0)})
    } else {
        res.status(400).json({ error: "Numbers query parameter is required" });
    }
})

router.get("/hello", (req: Request, res: Response) => {
    res.json({ msg: "Hello world!" })
});

export default router