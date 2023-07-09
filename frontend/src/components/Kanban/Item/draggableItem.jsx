import { Draggable } from '@hello-pangea/dnd';

// use with
 // style={getItemStyle(
                    //     snapshot.isDragging,
                    //     provided.draggableProps.style
                    // )};
//###########################
// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     padding: 8 * 2,
//     margin: `0 0 ${8}px 0`,

//     // change background colour if dragging
//     background: isDragging ? "lightgreen" : "grey",

//     // styles we need to apply on draggables
//     ...draggableStyle
// });

export default function DraggableItem({ item, index, children }) {
    return (
        <Draggable draggableId={`${item.id}`} index={index}>
            {(provided, snapshot) => (
                <li ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{...provided.draggableProps.style}} >

                    {children}

                </li>
            )}
        </Draggable>
    )
}