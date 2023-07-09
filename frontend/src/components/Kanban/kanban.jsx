import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column/column';
import { fakeData } from '../../assets/fakeData';
import { v4 as uuidv4 } from 'uuid';
import SVG from '../../assets/icons/add-button.svg'
import Overlay from '../Overlays/BaseOverlay/baseOverlay';
import NewUserOverlay from '../Overlays/NewUser/newUser';
import { useDispatch, useSelector } from 'react-redux';
import {createData, findPossibleIndex} from './movetodo'
import api from '../../axios';
import { setTodos } from '../../Redux/Slices/todosSlice'


export default function Kanban() {
    const dispatch = useDispatch()
    const boardData = useSelector((store) => store.todos.filteredList)
    const isAdmin = useSelector(store => store.user.user.isAdmin)
    const token = useSelector(store => store.user.token)
    const [state, setState] = useState(boardData);
    const [newUserVisibility, setnewUserVisibility] = useState(false)

    useEffect(() => {
        setState(boardData)
    }, [boardData])
    
    
    const reorder = (list, startIndex, endIndex) => {
        const result = structuredClone(list.todos);
        const removed = result.splice(startIndex, 1)[0];
        endIndex = findPossibleIndex(removed, result, endIndex)
        result.splice(endIndex, 0, removed);
        return [result, endIndex];
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = structuredClone(source);
        const destClone = structuredClone(destination);
        const [removed] = sourceClone.todos.splice(droppableSource.index, 1);
        const endIndex = findPossibleIndex(removed, destClone.todos, droppableDestination.index)
        destClone.todos.splice(endIndex, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        return [result, endIndex];
    };

    async function handleOnDragEnd (result) {

        const { source, destination, draggableId } = result;
        // dropped outside the list
        if (!destination || destination.droppableId == state.length - 1) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
        let newState = structuredClone(state)        
        let todo = newState[sInd].todos.find(todo => todo.id == draggableId)

        if (sInd === dInd) {
            const [items, index] = reorder(state[sInd], source.index, destination.index);
            newState[sInd].todos = items;
            result.destination.index = index
            setState(newState);
        } else {
            const [items, index] = move(state[sInd], state[dInd], source, destination);
            newState[sInd] = items[sInd];
            newState[dInd] = items[dInd];
            result.destination.index = index
            setState(newState);
        }
        const data = createData(result, newState)
        if (JSON.stringify(data.from) !== JSON.stringify(data.to)) {
            let config = {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
            };
            const response = await api.patch('todos/moveTodo/', data, config)
            await dispatch(setTodos(response.data)) 
        }
    }
    
    return (
        <>
            <Overlay visibilityCondition={newUserVisibility} exitFunction={setnewUserVisibility} >
                <NewUserOverlay exitFunction={setnewUserVisibility} />
            </Overlay>
            <DragDropContext onDragEnd={handleOnDragEnd} >
                <div className='flex w-full h-full overflow-y-hidden gap-1.5'>
                    {state.map((object, index) =>
                        <Column key={uuidv4()} droppableId={index} content={object} />)}
                    {isAdmin &&
                    <button className="flex justify-center items-center btn bg-lightBlue mt-2.5" onClick={() => setnewUserVisibility(true)}>
                        <img src={SVG} className='w-6 invert' />
                    </button>
                    }
                </div>

            </DragDropContext>
        </>
    );
}
