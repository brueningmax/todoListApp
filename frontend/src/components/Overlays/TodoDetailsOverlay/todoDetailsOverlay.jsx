import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import View from '../../../assets/icons/view.svg'
import api from '../../../axios'
import { setTodos } from '../../../Redux/Slices/todosSlice'
import { months, priorities, status, statusSelections } from './formData'



export default function TodoDetailsOverlay({ todo, exitFunction }) {
    const dispatch = useDispatch()
    const [clientDetails, setClientDetails] = useState(false)
    const token = useSelector(store => store.user.token)
    const [selectedStatus, setSelectedStatus] = useState(-1)

    const completeTodoHandler = async () => {
        // e.preventDefault()
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            const response = await api.patch(`todos/complete/${todo.id}`, config)
            if (response.status !== 200) {
                alert('something went wrong')
            } else {
                dispatch(setTodos(response.data))
                exitFunction(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const updateTodoHandler = async () => {
        if (selectedStatus !== -1 && statusSelections[selectedStatus].status !== 'completed') {

            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                };
                let data = {
                    status: statusSelections[selectedStatus].status
                }
                const response = await api.patch(`todos/${todo.id}`, data, config)
                if (response.status !== 200) {
                    alert('something went wrong')
                } else {
                    dispatch(setTodos(response.data))
                    exitFunction(false)
                }
            } catch (err) {
                console.log(err)
            }
        } else if (statusSelections[selectedStatus].status === 'completed'){
            completeTodoHandler()
        }
        }


    return (
        <div className="overlay p-0">
            <div className={`flex ${priorities[todo.priority].color}  w-full px-16 rounded-t-md`}>
                <span className="text-white text-xl">
                    {priorities[todo.priority].name}
                </span>
                <div className="flex w-full justify-between items-center text-sm">
                    <div className={`w-2.5 h-2.5 ${status[todo.status].color} rounded-full ml-auto mr-1 border-[#0000004F] border`}></div>
                    <span className="text-white">{status[todo.status].name}</span>
                </div>
            </div>
            <div className="overlay py-1.5">
                <p className="text-xl">{todo.type}</p>
                <div className="flex w-full justify-between ">
                    <p >Kunde: {todo.client.name} </p>
                    <button className="w-8 px-1 rounded-md border border-darkGray" onClick={() => setClientDetails(!clientDetails)}>
                        <img src={View} className='' />
                    </button>
                </div>
                {clientDetails && <>
                    <div className="w-full flex-col items-start">
                        <p className="text-left">Adresse:</p>
                        <p className="text-left">{todo.client.address}</p>
                    </div>
                    <div className="w-full flex-col items-start">
                        <p className="text-left">Ansprechpartner: {todo.client.contact}</p>
                        <p className="text-left">{todo.client.contact}</p>
                    </div>
                </>

                }
                <p>Zeitraum: {months[todo.month]} {todo.year}</p>
                <p>{todo.notes}</p>
                <p>Status ändern:</p>
                <select className="w-full" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                    <option value={-1} disabled hidden>Stand</option>
                    {statusSelections.map((status, index) => <option key={status.name} value={index} >{status.name}</option>)}
                </select>
                <button onClick={e => exitFunction(false)} className="btn mx-auto w-60 bg-low text-white bg-urgent hover:bg-highlight_urgent">Abbrechen</button>
                <button onClick={updateTodoHandler} className="btn mx-auto w-60 bg-low text-white hover:bg-highlight_low">Speichern</button>
            </div>
        </div>
    )
}