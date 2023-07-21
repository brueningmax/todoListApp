import { useState } from "react";
import api from "../../../axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setClients } from "../../../Redux/Slices/clientSlice";
import { toggleOverlay } from "../../../Redux/Slices/todosSlice";


export default function NewCustomerSettingsOverlay({ exitFunction,editToggle }) {

    const dispatch = useDispatch()
    const token = useSelector(store => store.user.token)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [error, setError] = useState(false)

    const createClient = async () => {
        if (!name){
            setError(true)
            return 
        }

        let data = {
            name: name, 
            address: address, 
            contact: contact 
        }
        let config = {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          };

        const response = await api.post('clients/new/', data, config)
        console.log(response)
        if (response.status !== 200) {
            alert('something went wrong')
        } else {
            dispatch(setClients(response.data))
            await dispatch(toggleOverlay(false))
            exitFunction(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createClient()
    }
    return (
        <div className="flex flex-col w-full gap-4">
            <div className={`flex flex-col items-start w-full`}>
                <label>Name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
                <label>Adresse:</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="input w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
                <label>Ansprechpartner:</label>
                <textarea value={contact} onChange={(e) => setContact(e.target.value)} type="text" className="input w-full" />
            </div>
            { error && <span className="w-full text-urgent">Es muss mindestens ein Name benötigt.</span>}
            <button onClick={(e) => handleSubmit(e)} className="btn w-full bg-low text-white hover:bg-highlight_low">Neuen Kunden speichern</button>
            <button onClick={(e) => { e.preventDefault(); editToggle(true) }} className="btn w-full bg-high text-white hover:bg-highlight_high">Bestandskunden bearbeiten</button>
        </div>
    )
}