import React from "react";
type TItem = {
    id: string;
    text: string;
    clicked: boolean;
}
interface ListProps {
    header: string,
    items: TItem[],
    updateList: (id: string) => void
}

const MyList: React.FC<ListProps> = ({header, items, updateList: updateList}) => {

    return(
        <div>
            <h2>{header}</h2>
            <ol>
                {items.map(item => (
                    <li 
                        key={item.id} 
                        onClick={() => updateList(item.id)} 
                        {...(item.clicked && { style: { textDecoration: 'line-through' } })}
                    >
                        {item.text}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default MyList