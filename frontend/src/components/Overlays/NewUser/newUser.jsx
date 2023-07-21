import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../axios";
import { useDispatch } from "react-redux";
import { setTodos, toggleOverlay } from '../../../Redux/Slices/todosSlice'


export default function NewUserOverlay({ exitFunction }) {
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(0);
    const token = useSelector(store => store.user.token)


    const createUser = async () => {
        try {
            let data = {
                name: name,
                password: password,
                isAdmin: isAdmin ? 1 : 0
            };
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            let response = await api.post('users/new/', data, config)
            if (response.status === 200 ) {
                dispatch(setTodos(response.data))
            } else {
                alert('something went wrong')
            }
        } catch (err) {
            if (err.response.status === 401) {
                window.alert('you dont have the rights')
            } else {
                console.log(err)
            }
        }
    }

        const handleSubmit = async (e) => {
            e.preventDefault()
            await createUser()
            await dispatch(toggleOverlay(false))
            exitFunction(false)
        }
        return (
            <form className="overlay">
                <div className="flex flex-col items-start w-full">
                    <label>Benutzer</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input w-full" />
                </div>
                <div className="flex flex-col items-start w-full">
                    <label>Login</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="input w-full" />
                </div>
                <div className="flex justify-start w-full gap-1">
                    <label>Admin-Rechte:</label>
                    <input value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} type="checkbox" className="input flex items-center" />
                </div>
                <button onClick={(e) => handleSubmit(e)} className="btn w-full bg-low text-white hover:bg-highlight_low">Benutzer anlegen</button>
                <button onClick={(e) => { e.preventDefault(); exitFunction(false) }} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Abbrechen</button>
            </form>
        )
    }