import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import View from '../../../assets/icons/view.svg'
import api from '../../../axios'
import { updateUser } from "../../../Redux/Slices/userSlice";


export default function OwnUserOverlay({ exitFunction }) {
    const dispatch = useDispatch()
    const userDetails = useSelector(store => store.user)
    const [username, setUsername] = useState(userDetails.user.name);
    const [login, setLogin] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false)


    const updateUserHandler = async (e) => {
        e.preventDefault()
        try {
            const data = {name: username}
            if (login) {
                data.password = login
            }
            let config = {
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${userDetails.token}`
                },
              };
            const response = await api.patch(`users/${userDetails.user.id}`, data, config)
            if (response.status !== 200) {
                alert('something went wrong')
            } else {
                dispatch(updateUser(response.data))
                exitFunction(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className="overlay">
            <div className="flex flex-col items-start w-full">
                <label>Benutzer</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="input w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
                <label>Passwort</label>
                <div className="flex w-full border-2 border-darkGray rounded-md">
                    <input value={login} onChange={(e) => setLogin(e.target.value)} type={passwordVisibility ? 'text' : 'password'} className="input rounded-none border-none w-full" />
                    <button onClick={(e) => {e.preventDefault(); setPasswordVisibility(!passwordVisibility)}}>
                        <img src={View} className='w-8 px-1 border-s-2 border-darkGray' />
                    </button>
                </div>
            </div>
            <div role="status">
</div>
            <button onClick={(e) => updateUserHandler(e)} className="btn w-full bg-low text-white hover:bg-highlight_low">Änderung speichern</button>
            <button onClick={(e) => { e.preventDefault(); exitFunction(false) }} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Abbrechen</button>
        </form>
    )
}