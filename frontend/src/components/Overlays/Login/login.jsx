import { useEffect, useState } from "react"
import Overlay from "../BaseOverlay/baseOverlay"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../../Redux/Slices/userSlice"
import api from "../../../axios"


export default function Login() {
    const dispatch = useDispatch()

    const token = useSelector(store => store.user.token)

    const [visibility, setVisibility] = useState(true)
    const [username, setUsername] = useState('Admin')
    const [password, setPasswort] = useState('admin')
    const [wrongInput, setWrongInput] = useState(false)

    useEffect(() => {
        if (token) {
            setVisibility(false)
        } else if (!token) {
            setVisibility(true)
        }
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            username: username,
            password: password
        })
        try {
            const response = await api.post('auth/', data)
            if (response.status === 200) {
                dispatch(setUser(response.data))
            }
        } catch (err) {
            if (err.response.status === 401) {
                setWrongInput(true)
            } else {
                console.log(err)
            }
        }

    }

    const exitFunction = () => {
        if (token) {
            setVisibility(false)
        }
    }

    // const handleClose = () => {
    //     console.log(BrowserWindow)
    //     ipcRenderer.send('close-window');
    //   };

    return (
        <Overlay customStyling="bg-darkBlue bg-opacity-100" visibilityCondition={visibility} exitFunction={exitFunction}>
            <form className="overlay">
                <div className="flex justify-between w-full">
                    <label >Benutzername</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="input w-40" autoComplete="username" />
                </div>
                <div className="flex justify-between w-full">
                    <label>Passwort</label>
                    <input value={password} onChange={(e) => setPasswort(e.target.value)} type="password" className="input w-40" autoComplete="current-password" />
                </div>
                {wrongInput && <span className='text-red-600'>Die Eingaben waren falsch, bitte versuche es erneut</span>}
                <button onClick={(e) => handleSubmit(e)} className="btn w-full bg-low text-white hover:bg-highlight_low">Login</button>
                <button onClick={(e) => { e.preventDefault(); handleClose() }} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Schliessen</button>
            </form>
        </Overlay>
    )
}