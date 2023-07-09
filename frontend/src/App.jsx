import './App.css'
import Main from './components/Containers/Main/Main'
import Kanban from './components/Kanban/kanban'
import SearchBar from './components/Searchbar/searchbar'
import Sidebar from './components/Sidebar/sidebar'
import Login from './components/Overlays/Login/login'
import { useEffect, useState } from 'react'
import api from './axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos } from './Redux/Slices/todosSlice'
import { setClients } from './Redux/Slices/clientSlice'
import { Spinner } from './components/Spinner'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const token = useSelector(store => store.user.token)

  const getBoard = async () => {
    let response = await api.get('board/')
    dispatch(setTodos(response.data))
    response = await api.get('clients/')
    dispatch(setClients(response.data))
  }

  useEffect(() => {
    getBoard()
    setLoading(false)
    setInterval(getBoard, 1800000)
  }, [])

  return (
    <div className='flex fixed top-0 left-0 w-full h-full'>
      <Login />
      <Sidebar />
      <Main>
        {loading ?
          <div className='w-full h-full flex items-center justify-center'>
            <Spinner />
          </div>
          : <>
            <SearchBar />
            <Kanban />
          </>
        }
      </Main>
    </div>
  )
}

export default App
