import './App.css'
import Main from './components/Containers/Main/Main'
import Kanban from './components/Kanban/kanban'
import SearchBar from './components/Searchbar/searchbar'
import Sidebar from './components/Sidebar/sidebar'
import Login from './components/Overlays/Login/login'
import { useSelector } from 'react-redux'
import { UseBoardUpdate } from './components/UseUpdate'


function App() {
  const token = useSelector(store => store.user.token)


  return (
    <div className='flex fixed top-0 left-0 w-full h-full'>
      {!token ? <Login/> : <UseBoardUpdate/>}
      <Sidebar />
      <Main>
        <SearchBar />
        <Kanban />
      </Main>
    </div>
  )
}

export default App
