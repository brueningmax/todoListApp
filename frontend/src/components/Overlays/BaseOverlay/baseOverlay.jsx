import { useDispatch } from 'react-redux';
import { toggleOverlay } from '../../../Redux/Slices/todosSlice'

const Overlay = ({ visibilityCondition, exitFunction, customStyling = 'bg-opacity-30', children }) => {
    const dispatch = useDispatch()
    const handleClose = async (e) => {
        if (e.target.id == 'background') {
            dispatch(toggleOverlay(false))
            exitFunction(!visibilityCondition);
        }
    }

    return (
        <div id='background' className={` ${visibilityCondition ? 'visible' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center z-50 ${customStyling}`} onClick={(e) => handleClose(e)}>
            {visibilityCondition && children}
        </div>
    )

}
export default Overlay;
