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
            console.log('getUpdates')
            getUpdates()
        }
            , 0.05 * 60 * 1000);
        setIntervalId(interval)

        return () => { clearInterval(intervalId) }
    }, [])

    useEffect(() => {
        console.log('running Update')
        runUpdate()
    }, [boardData, clientsData])

    useEffect(() => {
        if (overlayOpen === false) {
            console.log('getting data')
            getUpdates()
        }
    }, [overlayOpen])

    const runUpdate = async () => {
        if (overlayOpen === false) {
            if (clientsData.length !== 0) {
                await dispatch(setClients(clientsData))
                setClientsData([])
                console.log('udpate clients')
            }
            if (boardData.length !== 0) {
                await dispatch(setTodos(boardData))
                setBoardData([])
                console.log('udpate board')
            }
        }
    }

    const getUpdates = async () => {
        if (overlayOpen === false) {
            let boardResponse = await api.get('board/')
            let clientsResponse = await api.get('clients/')

            let board = [await JSON.stringify(boardResponse.data), await JSON.stringify(boardData)]
            let clients = [await JSON.stringify(clientsResponse.data), await JSON.stringify(clientsData)]
            if (board[0] !== board[1]) {
                await setBoardData(boardResponse.data)
            } else {
                console.log('no update')
            }
            if (clients[0] !== clients[1]) {
                await setClientsData(clientsResponse.data)
            } else {
                console.log('no update')
            }
        }
    }
    return null;
}