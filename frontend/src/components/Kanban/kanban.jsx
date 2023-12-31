import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column/column';
import { v4 as uuidv4 } from 'uuid';
import SVG from '../../assets/icons/add-button.svg'
import Overlay from '../Overlays/BaseOverlay/baseOverlay';
import NewUserOverlay from '../Overlays/NewUser/newUser';
import { useDispatch, useSelector } from 'react-redux';
import {createData, findPossibleIndex} from './movetodo'
import api from '../../axios';
import { setTodos, toggleOverlay } from '../../Redux/Slices/todosSlice'


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
            await dispatch(toggleOverlay(true))
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
            await (dispatch(toggleOverlay(false)))
        }
    }
    const colors = [
        'bg-[#FF5733]', // Orange
        'bg-[#F93822]', // Red
        'bg-[#FFC300]', // Yellow
        'bg-[#FF3E96]', // Pink
        'bg-[#FFB6C1]', // Light Pink
        'bg-[#FF7F50]', // Coral
        'bg-[#FF1493]', // Deep Pink
        'bg-[#40E0D0]', // Turquoise
        'bg-[#00FFFF]', // Cyan
        'bg-[#00FF00]', // Lime Green
        'bg-[#7CFC00]', // Lawn Green
        'bg-[#00FF7F]', // Spring Green
        'bg-[#32CD32]', // Lime
        'bg-[#228B22]', // Forest Green
        'bg-[#8FBC8F]', // Dark Sea Green
        'bg-[#48D1CC]', // Medium Turquoise
        'bg-[#00CED1]', // Dark Turquoise
        'bg-[#1E90FF]', // Dodger Blue
        'bg-[#0000FF]', // Blue
        'bg-[#7B68EE]', // Medium Slate Blue
    ];
    
    return (
        <>
            <Overlay visibilityCondition={newUserVisibility} exitFunction={setnewUserVisibility} >
                <NewUserOverlay exitFunction={setnewUserVisibility} />
            </Overlay>
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={() => { dispatch(toggleOverlay(true)) }}>
                <div className='flex w-full h-full overflow-y-hidden'>
                    {state.map((object, index) =>
                        <Column key={uuidv4()} droppableId={index} content={object} userColor={colors[index]} />)}
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
