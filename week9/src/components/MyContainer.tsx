import { useState } from "react"
import MyList from "./MyList"

type TItem = {
    id: string
    text: string
    clicked: boolean;
}

function MyContainer() {
    const [items, setItems] = useState<TItem[]>([
        { id: "1", text: "this is first task", clicked: false },
        { id: "2", text: "this is second task", clicked: false }
    ])
    const [textArea, setTextArea] = useState("")
    const addItem = (text:string) => {
        const id: number = Math.floor(Math.random() * 1000000 + 1000)
        const newItem: TItem = {id:`${id}`,text:text, clicked:false}
        setItems([...items,newItem])
    }
    
    const setItemClicked = (id: string) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, clicked: true } : item
        ));
    };

    return (
        <div>
            <textarea value={textArea} onChange={e => setTextArea(e.target.value)}></textarea>
            <button onClick={() => addItem(textArea)}>
                Add item
            </button>
            <MyList header="this is a list header" items={items} updateList={setItemClicked}/>
        </div>
    )
}
export default MyContainer