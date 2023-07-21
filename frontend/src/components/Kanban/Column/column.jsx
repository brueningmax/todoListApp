import { Droppable } from '@hello-pangea/dnd';
import DraggableItem from '../Item/draggableItem';
import DefaultColumnHead from './ColumnHeads/columnHead';
import NotAssignedColumnHead from './ColumnHeads/notAssignedHead'
import CompletedColumnHead from './ColumnHeads/completedColumnHead'
import Todo from '../../Todo/todo';
import { useSelector } from 'react-redux';

export default function Column({ content, droppableId }) {

    const isAdmin = useSelector(store => store.user.user.isAdmin)
    const filtered = useSelector(store => store.todos.filtered)

    const assignColumnHead = (content) => {
        switch (content.user.name) {
            case "not assigned":
                return <NotAssignedColumnHead user={content.user} />
            case "completed":
                return <CompletedColumnHead user={content.user} />
            default:
                return <DefaultColumnHead user={content.user} />
        }
    }

    return (
        <Droppable droppableId={`${droppableId}`}>
            {(provided, snapshot) => (
                <div className='px-1 h-full'>
                <div className='flex flex-col gap-2.5 flex-grow-1 bg-white rounded-2xl w-52 min-w-fit h-full grow py-2.5 '>
                    {assignColumnHead(content)}
                    <ul className="flex flex-col overflow-y-scroll h-full scrollbar pb-2.5 pl-1.5 " {...provided.droppableProps} ref={provided.innerRef}>
                        {content.todos.map((todo, index) => {
                            if (!isAdmin || filtered || todo.status === 'completed') {
                                return <Todo todo={todo} key={todo.id}className='border-2 bg-red-500 p-2' />
                            } else {
                                return(
                                    <DraggableItem key={todo.id} item={todo} index={index} >
                                        <Todo todo={todo} className='border-2 bg-red-500 p-2' />
                                    </DraggableItem>
                                )
                            }
                            }
                        )}
                        {provided.placeholder}
                    </ul>
                </div>
                </div>
            )}
        </Droppable>
    )
}