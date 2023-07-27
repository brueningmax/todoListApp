import { useState } from "react";
import ExistingCustomerSettingsOverlay from "./existingCustomer";
import NewCustomerSettingsOverlay from "./newCustomer";

export default function CustomerSettingsOverlay({ exitFunction }) {
    
    const [editExistingCustomer, setEditExistingCustomer] = useState(true);

    return (
        <div className="overlay">
            {editExistingCustomer ?
                <ExistingCustomerSettingsOverlay exitFunction={exitFunction} editToggle={setEditExistingCustomer} /> :
                <NewCustomerSettingsOverlay exitFunction={exitFunction} editToggle={setEditExistingCustomer} />}
            <button onClick={(e) => { e.preventDefault(); exitFunction(false) }} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Abbrechen</button>
        </div>
    )
}