import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import api from "../../../axios";
import { months, types, priorities } from "./formData";
import { setTodos } from "../../../Redux/Slices/todosSlice";

export default function NewTodoOverlay({ exitFunction }) {

    const dispatch = useDispatch()
    const availableClients = useSelector(store => store.clients.list)
    const token = useSelector(store => store.user.token)
  
    const [fieldMissing, setFieldMissing] = useState(false)

    const [selectedClient, setSelectedClient] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')
    const [years, setYears] = useState([])
    const [notes, setNotes] = useState('')

    useEffect(() => {
        let yearsCopy = []
        const currentYear = new Date().getFullYear()
        for (let i = -2; i <= 2; i++) {
            yearsCopy.push(currentYear + i)
        }
        setYears(yearsCopy)
    }, [])


    const createTodo = async () => {
        const arr = [selectedPriority, selectedType, selectedClient, selectedMonth, selectedYear]
        if (arr.some(state => state == false)) {
            setFieldMissing(true)
        } else {
            try {
                let data = {
                    priority: selectedPriority,
                    type: selectedType,
                    notes: notes,
                    client: selectedClient,
                    month: selectedMonth,
                    year: selectedYear,
                };
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                };
                let response = await api.post('todos/new/', data, config)

                if (response.status === 201) {
                    dispatch(setTodos(response.data))
                    exitFunction(false)
                } else {
                    alert('something went wrong')
                    console.log(response)
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    window.alert('you dont have the rights')
                } else 
                {
                    console.log(err)
                }
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        createTodo()
    }
    return (
        <form className="overlay">
            <select className={`py-1 w-full border-b-2 border-lightGray ${selectedClient ? 'text-black' : 'text-darkGray'}`} value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
                <option value={''} disabled hidden>Kunde</option>
                {availableClients.map(client => <option className="text-black" key={client.id} value={client.id}>{client.name}</option>)}
            </select>
            {/* Type */}
            <select className={`py-1 w-full border-b-2 border-lightGray ${selectedType ? 'text-black' : 'text-darkGray'}`} value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                <option value={''} disabled hidden>Auftrag</option>
                {types.map(type => <option className="text-black" key={type} value={type}>{type}</option>)}
            </select>
            {/* Priority */}
            <select className={`py-1 w-full border-b-2 border-lightGray ${selectedPriority ? 'text-black' : 'text-darkGray'}`} value={selectedPriority} onChange={e => setSelectedPriority(e.target.value)}>
                <option value={''} disabled hidden>Priorität</option>
                {priorities.map(priority => <option className="text-black" key={priority.name} value={priority.value}>{priority.name}</option>)}
            </select>
            {/* Month */}
            <div className="flex w-full gap-1">
                <p className="text-darkGray text-center">Zeitraum:</p>
                <select className={`py-1 border-b-2 border-r-2 border-lightGray w-32 text-center ${selectedMonth ? 'text-black' : 'text-darkGray'}`} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                    <option value={''} disabled hidden>Monat</option>
                    {months.map(month => <option className="text-black" key={month.name} value={month.value}>{month.name}</option>)}
                </select>
                {/* Year */}
                <select className={`py-1 border-b-2 border-lightGray w-32 text-center ${selectedYear ? 'text-black' : 'text-darkGray'}`} value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    <option value={''} disabled hidden>Jahr</option>
                    {years.map(year => <option className="text-black" key={year} value={year}>{year}</option>)}
                </select>
            </div>
            <div className="w-full flex flex-col items-start">
                <label>Bemerkunden</label>
                <textarea className="w-full input" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
            </div>
            {fieldMissing && <p className="text-urgent">Bitte fülle alle Felder aus</p>}
            <button onClick={(e) => handleSubmit(e)} className="btn w-full bg-low text-white hover:bg-highlight_low">Todo speichern</button>
            <button onClick={(e) => exitFunction(false)} className="btn w-full bg-urgent text-white hover:bg-highlight_urgent">Abbrechen</button>
        </form>
    )
}