import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../axios";
import { updateClient, deleteClient } from '../../../Redux/Slices/clientSlice'
import { toggleOverlay } from "../../../Redux/Slices/todosSlice";

export default function ExistingCustomerSettingsOverlay({ exitFunction, editToggle }) {
    const dispatch = useDispatch()

    const emptyCustomer = {
        id: 0,
        name: 'Kunden wählen',
        address: 'Kunden wählen',
        contact: 'Kunden wählen'
    }
    const token = useSelector(store => store.user.token)

    const [selectedIndex, setSelectedIndex] = useState(0);
    const availableCustomers = useSelector(store => [emptyCustomer, ...store.clients.list])
    const [selectedCustomers, setSelectedCustomers] = useState(availableCustomers[0]);

    const [clientName, setClientName] = useState('')
    const [clientAddress, setClientAddress] = useState('')
    const [clientContact, setClientContact] = useState('')

    useEffect(() => {
        setSelectedCustomers(availableCustomers[selectedIndex])
        setClientName(availableCustomers[selectedIndex].name)
        setClientAddress(availableCustomers[selectedIndex].address)
        setClientContact(availableCustomers[selectedIndex].contact)
    }, [selectedIndex])

    const updateClientHandler = async () => {
        try {
            let clientID = selectedCustomers.id
            let data = {
                name: clientName,
                address: clientAddress,
                contact: clientContact
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            let response = await api.patch('clients/1', data, config)
            if (response.status !== 200) {
                alert('something went wrong')
            } else {
                dispatch(updateClient({ ...data, id: clientID }))
                await dispatch(toggleOverlay(false))
                exitFunction(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteClientHandler = async () => {
        try {
            const clientToUpdate = selectedCustomers.id
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
            let response = await api.delete(`clients/${clientToUpdate}`, config)
            if (response.status !== 204) {
                alert('something went wrong')
            } else {
                dispatch(deleteClient(clientToUpdate))
                await dispatch(toggleOverlay(false))
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
        <div className="flex flex-col w-full gap-4">
            <div className="flex w-full justify-between gap-2.5">
                <select className={`py-1 text-center grow text-start border-b-2 ${selectedCustomers ? 'text-black' : 'text-darkGray'}`} value={selectedIndex} onChange={e => setSelectedIndex(e.target.value)}>
                    <option value={0} disabled hidden>Kunden wählen</option>
                    {availableCustomers.map((customer, index) => index != 0 ? <option className="text-black" key={customer.id} value={index}>{customer.name}</option> : '')}
                </select>
                <button onClick={() => editToggle(false)} className="btn bg-low hover:bg-highlight_low">ADD</button>
            </div>
            <div className="flex flex-col items-start w-full">
                <label>Name:</label>
                <input value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" className="input w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
                <label>Adresse:</label>
                <textarea value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} type="text" className="input w-full" />
            </div>
            <div className="flex flex-col items-start w-full">
                <label>Ansprechpartner:</label>
                <textarea value={clientContact} onChange={(e) => setClientContact(e.target.value)} type="text" className="input w-full" />
            </div>
            <button onClick={(e) => handleSubmit(e, updateClientHandler)} className="btn w-full bg-low text-white hover:bg-highlight_low">Änderung speichern</button>
            <button onClick={(e) => handleSubmit(e, deleteClientHandler)} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Kunden löschen</button>
            </div>
    )
}