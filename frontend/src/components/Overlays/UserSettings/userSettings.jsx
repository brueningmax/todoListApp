import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from '../../../axios'
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from '../../../Redux/Slices/todosSlice'

export default function UserSettingsOverlay({ exitFunction }) {
    const dispatch = useDispatch()
    const board = useSelector(store => store.todos.list)
    const token = useSelector(store => store.user.token)

    const [selectedUser, setSelectedUser] = useState(-1);
    const [advancedRights, setadvancedRights] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([])

    useEffect(() => {
        setAvailableUsers(board.filter(column => column.user.id !== 1 && column.user.id !== 2))
    }, [board])

    useEffect(() => {
        if (selectedUser !== -1) {
            let user = availableUsers[selectedUser]
            setadvancedRights(user.user.isAdmin)
        }
    }, [selectedUser])   

    const updateUserHandler = async () => {
        try {
            const userToUpdate = availableUsers[selectedUser].user
            let data = {
                id: userToUpdate.id,
                isAdmin: advancedRights ? 1 : 0
            };
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            let response = await api.patch(`users/${userToUpdate.id}`,data, config)
            if (response.status !== 200) {
                alert('something went wrong')
            } else {
                dispatch(updateUser(data))
                exitFunction(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const resetPasswordHandler = async () => {
        try {
            let userToUpdate = availableUsers[selectedUser].user
            let data = {
                "password": userToUpdate.name,
            };
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            console.log(config)
            let response = await api.patch(`users/${userToUpdate.id}`, data, config)
            console.log(response)
            if (response.status !== 200) {
                alert('something went wrong')
            } else {
                alert(`Password was reset to "${userToUpdate.name}"`)
                exitFunction(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteUserHandler = async () => {
        if (selectedUser === 1 || selectedUser === 2 ) {
            alert('Diese Nutzer können nicht gelöscht werden')
            return
        }
        try {
            const userToUpdate = availableUsers[selectedUser].user
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            let response = await api.delete(`users/${userToUpdate.id}`, config)
            if (response.status !== 204) {
                alert('something went wrong')
            } else {
                dispatch(deleteUser(userToUpdate.id))
                exitFunction(false)
            }
        } catch (err) {
            console.log(err)

        }
    }

    const handleSubmit = (e, callFunction) => {
        e.preventDefault()
        callFunction()
    }

    return (
        <form className="overlay">
            <select className={`py-1 text-center w-full text-start border-b-2 ${selectedUser ? 'text-black' : 'text-darkGray'}`} value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                <option value={-1} disabled hidden>Benutzer wählen</option>
                {availableUsers.map((column, index) => <option className="text-black" key={column.user.id} value={index}>{column.user.name}</option>)}
            </select>
            <div className="flex  justify-between w-full">
                <label>Kann Todos verteilen:</label>
                <input checked={advancedRights} onChange={(e) => setadvancedRights(!advancedRights)} type="checkbox" className="input" />
            </div>
            <button onClick={(e) => handleSubmit(e, updateUserHandler)} className="btn w-full bg-low text-white hover:bg-highlight_low">Änderung speichern</button>
            <button onClick={(e) => handleSubmit(e, resetPasswordHandler)} className="btn w-full bg-high text-white hover:bg-highlight_high">Passwort zurücksetzen</button>
            <button onClick={(e) => handleSubmit(e, deleteUserHandler)} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Benutzer löschen</button>
            <button onClick={(e) => { e.preventDefault(); exitFunction(false) }} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Abbrechen</button>
        </form>
    )
}