import api from '../../axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTodos } from '../../Redux/Slices/todosSlice'
import { setClients } from '../../Redux/Slices/clientSlice'

export const UseBoardUpdate = () => {
    const dispatch = useDispatch()
    const overlayOpen = useSelector(store => store.todos.overlayOpen)
    const [boardData, setBoardData] = useState([])
    const [clientsData, setClientsData] = useState([])
    const [intervalId, setIntervalId] = useState([])

    useEffect(() => {
        getUpdates();
        const interval = setInterval(() => {
            getUpdates()
        }
            , 0.05 * 60 * 1000);
        setIntervalId(interval)

        return () => { clearInterval(intervalId) }
    }, [])

    const getUpdates = async () => {
        let boardResponse = await api.get('board/')
        let clientsResponse = await api.get('clients/')
        let board = [await JSON.stringify(boardResponse.data), await JSON.stringify(boardData)]
        let clients = [await JSON.stringify(clientsResponse.data), await JSON.stringify(clientsData)]
        if (board[0] !== board[1]) {
            await setBoardData(boardResponse.data)
        } else {
            console.log('no board update')
        }
        if (clients[0] !== clients[1]) {
            await setClientsData(clientsResponse.data)
        } else {
            console.log('no clients update')
        }
    }

    useEffect(() => {
        deployUpdate()
    }, [boardData, clientsData])


    useEffect(() => {
        if (overlayOpen === false) {
            getUpdates()
        }
    }, [overlayOpen])

    const deployUpdate = async () => {
        if (overlayOpen === false) {
            if (clientsData.length !== 0) {
                await dispatch(setClients(clientsData))
                setClientsData([])
            }
            if (boardData.length !== 0) {
                await dispatch(setTodos(boardData))
                setBoardData([])
            }
        } else {
            console.log('overlay open?')
        }
    }

    
    return null;
}