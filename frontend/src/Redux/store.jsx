import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './Slices/userSlice'
import TodosReducer from './Slices/todosSlice'
import ClientReducer from './Slices/clientSlice'

export default configureStore({
    reducer: {
        user: UserReducer,
        todos: TodosReducer,
        clients: ClientReducer
    }
});