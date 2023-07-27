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
                await dispatch(toggleOverlay(false))
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
                    await dispatch(toggleOverlay(false))
                    exitFunction(false)
                }
            } catch (err) {
                console.log(err)
            }
        } else if (statusSelections[selectedStatus].status === 'completed') {
            completeTodoHandler()
        }
    }


    return (
        <div className="overlay p-0">
            <div className={`flex ${priorities[todo.priority].color} w-full px-16 rounded-t-md`}>
                <span className="text-white text-xl">
                    {priorities[todo.priority].name}
                </span>
                <div className="flex w-full justify-between items-center text-sm">
                    <div className={`w-2.5 h-2.5 ${status[todo.status].color} rounded-full ml-auto mr-1 border-[#0000004F] border`}></div>
                    <span className="text-white">{status[todo.status].name}</span>
                </div>
            </div>
            <div className="overlay max-w-full py-1.5 w-full">
                <p className="text-xl">{todo.type}</p>
                <div className="pl-0.5 flex w-full justify-between ">
                    <p >Kunde: {todo.client.name} </p>
                    <button className="w-8 px-1 rounded-md border border-darkGray" onClick={() => setClientDetails(!clientDetails)}>
                        <img src={View} className='' />
                    </button>
                </div>
                <div
                    className={`flex flex-col gap-2 max-h-[50%] transition-all overflow-auto ${clientDetails ? 'h-40' : 'h-0'}`}
                >
                    <div className="w-full flex-col items-start">
                        <p className="text-left underline decoration-slate-400">Adresse:</p>
                        <p className="text-left">{todo.client.address}</p>
                    </div>
                    <div className="w-full flex-col items-start">
                        <p className="text-left underline decoration-slate-400">Ansprechpartner:</p>
                        <p className="text-left">{todo.client.contact}</p>
                    </div>
                </div>
                <div className="pl-0.5 items-start flex flex-col gap-2">
                    <div className=" w-full flex justify-between border-b-2 py-2">
                        <span className="underline decoration-slate-400">Zeitraum:</span>
                        <span> {months[todo.month]} {todo.year}</span>
                    </div>
                    <div className="pl-0.5 w-full flex flex-col gap-2 items-start border-b-2 py-2">
                        {todo.notes && <span className="underline decoration-slate-400">Notizen:</span>}
                        <span>{todo.notes}</span>
                    </div>
                    <div className="w-full flex flex-col gap-2 items-start border-b-2 py-2">
                        <span className="pl-0.5 underline decoration-slate-400">Status ändern:</span>
                        <select className=" w-full" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                            <option value={-1} disabled hidden>Stand</option>
                            {statusSelections.map((status, index) => <option key={status.name} value={index} >{status.name}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={e => exitFunction(false)} className="btn mx-auto w-60 bg-low text-white bg-urgent hover:bg-highlight_urgent">Abbrechen</button>
                <button onClick={updateTodoHandler} className="btn mx-auto w-60 bg-low text-white hover:bg-highlight_low">Speichern</button>
            </div>
        </div>
    )
}