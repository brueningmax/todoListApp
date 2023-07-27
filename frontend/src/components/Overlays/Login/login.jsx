import { useEffect, useState } from "react"
import Overlay from "../BaseOverlay/baseOverlay"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../../Redux/Slices/userSlice"
import api from "../../../axios"
import { Spinner } from "../../Spinner"
import { login } from "./utils"
import { setTodos, toggleOverlay } from "../../../Redux/Slices/todosSlice"
import { setClients } from "../../../Redux/Slices/clientSlice"
// const electron = window.require('electron');

export default function Login({ }) {
    const dispatch = useDispatch()
    const token = useSelector(store => store.user.token)
    const [visibility, setVisibility] = useState(true)
    const [username, setUsername] = useState('Admin')
    const [password, setPasswort] = useState('admin')
    const [error, setError] = useState('')
    const [showSpinner, setShowSpinner] = useState(false)

    const getBoard = async () => {
        let response = await api.get('board/')
        await dispatch(setTodos(response.data))
        response = await api.get('clients/')
        dispatch(setClients(response.data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSpinner(true)
        const response = await login(username, password)
        if (response.status === 200) {
            await getBoard()
            await dispatch(setUser(response.user))
            await dispatch(toggleOverlay(false))
        } else if (response.status === 401) {
            setError('Benutzername oder Passwort waren falsch. Bitte versuche es noch einmal ')
        } else {
            setError('Etwas ist schief gelaufen. Bitte versuche es noch einmal.')
        }
        setShowSpinner(false)
    }

    const exitFunction = () => {
        if (token) {
            setVisibility(false)
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        window.electron.closeApp();
      };

    return (
        <Overlay customStyling="bg-darkBlue bg-opacity-100" visibilityCondition={visibility} exitFunction={exitFunction}>
            <form className="overlay ">
                <div className="flex justify-between w-full">
                    <label className="mr-2" >Benutzername</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="input w-40" autoComplete="username" />
                </div>
                <div className="flex justify-between w-full">
                    <label className="mr-2">Passwort</label>
                    <input value={password} onChange={(e) => setPasswort(e.target.value)} type="password" className="input w-40" autoComplete="current-password" />
                </div>
                {error && <span className='text-red-600'>{error}</span>}
                {!showSpinner &&
                    <div className="h-28 w-full flex flex-col gap-4 items-start bg-white mt-5">
                        <button onClick={(e) => handleSubmit(e)} className="btn w-full bg-low text-white hover:bg-highlight_low">Login</button>
                        <button onClick={(e) => handleClose(e)} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Schliessen</button>
                    </div>}
                {showSpinner &&
                    <div className="h-28 w-full flex justify-center items-center mt-5">
                        <Spinner background="softGray" foreground="darkBlue" />
                    </div>
                }
            </form>
        </Overlay>
    )
}