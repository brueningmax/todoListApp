import { useEffect, useState } from "react"
import Filter from '../../assets/icons/filter.svg'
import Lock from '../../assets/icons/open-padlock.svg'
import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "../../Redux/Slices/todosSlice";
import { months, types, priorities, statuses } from './fromdata'

export default function SearchBar() {
    const dispatch = useDispatch()

    const filtered = useSelector(store => store.todos.filtered)
    const [years, setYears] = useState([])

    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')

    
    const submitHandler = () => {
        
        const filter = {
            ...(selectedCustomer && { client: selectedCustomer }),
            ...(selectedMonth && { month: selectedMonth }),
            ...(selectedYear && { year: selectedYear }),
            ...(selectedPriority && { priority: selectedPriority }),
            ...(selectedType && { type: selectedType }),
            ...(selectedStatus && { status: selectedStatus }),
        };
        
        dispatch(filterTodos(filter))
        setSelectedCustomer('');
        setSelectedMonth('');
        setSelectedYear('');
        setSelectedType('');
        setSelectedPriority('');
        setSelectedStatus('');
        
    }
    
    useEffect(() => {
        let yearsCopy = []
        const currentYear = new Date().getFullYear()
        for (let i = -2; i <= 2; i++) {
            yearsCopy.push(currentYear + i)
        }
        setYears(yearsCopy)
    }, [])

    const bg = filtered ? 'bg-urgent' : 'bg-lightBlue'
    const bg_bar = filtered ? ' border-urgent ' : 'border-white '
    

    const checkImage = () => {
        const fieldsEmpty = [
            selectedCustomer,
            selectedMonth,
            selectedYear,
            selectedType,
            selectedPriority,
            selectedStatus
          ].every(state => state === '')
        if (filtered && fieldsEmpty) {
            return {img: Lock, bg: 'bg-urgent', border: 'border-urgent'}
        } 
        return {img: Filter, bg: 'bg-lightBlue', border: 'border-white '}
    }

    return (
        <form className={`flex w-min gap-12 justify-items-start py-1.5 px-6 border-2 rounded-full bg-white box-border ${checkImage().border}`}>
            {/* Customer */}
            <input className={`my-1 border-b-2 border-lightGray ${selectedCustomer ? 'text-black' : 'text-darkGray'}`} type="text" placeholder="Kundenname..." value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)} />
            {/* Month */}
            <div className="flex">
                <select className={`my-1 border-b-2 border-r-2 border-lightGray w-32 text-center ${selectedMonth ? 'text-black' : 'text-darkGray'}`} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                    <option value={''} disabled hidden>Monat</option>
                    {months.map((month, index) => <option className="text-black " key={month.value} value={month.value}>{month.name}</option>)}
                </select>
                {/* Year */}
                <select className={`my-1 border-b-2 border-lightGray w-32 text-center ${selectedYear ? 'text-black' : 'text-darkGray'}`} value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    <option value={''} disabled hidden>Jahr</option>
                    {years.map(year => <option className="text-black " key={year} value={year}>{year}</option>)}
                </select>
            </div>
            {/* Type */}
            <select className={`my-1 border-b-2 border-lightGray ${selectedType ? 'text-black' : 'text-darkGray'}`} value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                <option value={''} disabled hidden>Auftag</option>
                {types.map(type => <option className="text-black " key={type} value={type}>{type}</option>)}
            </select>
            {/* Priority */}
            <select className={`my-1 border-b-2 border-lightGray ${selectedPriority ? 'text-black' : 'text-darkGray'}`} value={selectedPriority} onChange={e => setSelectedPriority(e.target.value)}>
                <option value={''} disabled hidden>Priorität</option>
                {priorities.map(priority => <option className="text-black " key={priority.value} value={priority.value}>{priority.name}</option>)}
            </select>
            {/* Status */}
            <select className={`my-1 border-b-2 border-lightGray ${selectedStatus ? 'text-black' : 'text-darkGray'}`} value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                <option value={''} disabled hidden>Stand</option>
                {statuses.map(status => <option className="text-black" key={status} value={status}>{status}</option>)}
                {months.map(month => <option className="text-black " key={month.value} value={month.name}>{month.name}</option>)}
            </select>
            <button type='button' className={`flex justify-center items-center btn ${checkImage().bg}`} onClick={submitHandler}>
                <img src={checkImage().img} className='w-6 invert' />
            </button>
        </form>
    )
}