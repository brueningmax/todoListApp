import SVG from '../../../../assets/icons/newTodo.svg'
import { useState } from 'react'
import Overlay from '../../../Overlays/BaseOverlay/baseOverlay'
import NewTodoOverlay from '../../../Overlays/NewTodoOverlay/newTodoOverlay'
import { useSelector } from 'react-redux';

export default function NotAssignedColumnHead({ user }) {

    const isAdmin = useSelector(store => store.user.user.isAdmin)
    const [newTodoVisibility, setNewTodoVisibility ] = useState(false)

    return (
        <div className="flex h-10 justify-between items-center w-full px-1.5">
            <p className="text-center" >
                Nicht zugeordnet
            </p>
            {isAdmin &&
            <button className="flex justify-center items-center btn w-10 bg-lightBlue " onClick={() => setNewTodoVisibility(true)}>
                <img src={SVG} className='w-6 invert'/>
            </button>
            }
            <Overlay visibilityCondition={newTodoVisibility} exitFunction={setNewTodoVisibility} >
                <NewTodoOverlay exitFunction={setNewTodoVisibility} />
            </Overlay>
        </div>
    )
}
