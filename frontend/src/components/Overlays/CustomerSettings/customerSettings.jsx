import { useState } from "react";
import ExistingCustomerSettingsOverlay from "./existingCustomer";
import NewCustomerSettingsOverlay from "./newCustomer";
import { useSelector } from "react-redux";

export default function CustomerSettingsOverlay({ exitFunction }) {
    const [selectedCustomers, setSelectedCustomers] = useState('');
    const [editExistingCustomer, setEditExistingCustomer] = useState(true);
    const [advancedRights, setadvancedRights] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user, login)
        exitFunction(false)
    }
    return (
            <div className="overlay">
            {editExistingCustomer ?
                <ExistingCustomerSettingsOverlay exitFunction={exitFunction} editToggle={setEditExistingCustomer} /> :
                <NewCustomerSettingsOverlay exitFunction={exitFunction} editToggle={setEditExistingCustomer} /> }
            <button onClick={(e) => { e.preventDefault(); exitFunction(false) }} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Abbrechen</button>
            </div>
    )
}