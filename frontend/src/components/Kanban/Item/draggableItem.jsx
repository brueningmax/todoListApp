import { Draggable } from '@hello-pangea/dnd';

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