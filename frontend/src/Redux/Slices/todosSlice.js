import { createSlice } from "@reduxjs/toolkit";
import { fakeData } from "../../assets/fakeData";

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        list: [],
        filteredList: [],
        filtered: false
    },
    reducers: {
        setTodos: (state, action) => {
            state.list = action.payload;
            state.filteredList = action.payload
        },
        addUser: (state, action) => {
            const user = {
                user: {
                    id: state.list[state.list.length - 2].user.id + 1,
                    name: action.payload.name
                },
                todos: []
            }
            state.list.splice(state.list.length - 1, 0, user);
        },
        deleteCompleted: (state) => {
            state.list[1].todos = state.list[1].todos.filter(todo => todo.status !== 'completed')
        },
        deleteUser: (state, action) => {
            let indexToDelete = state.list.findIndex(column => column.user.id == action.payload && column.user.id !== 1 && column.user.id !== 2)
            state.list.splice(indexToDelete, 1)
        },
        updateUser: (state, action) => {
            let index = state.list.findIndex(column => column.user.id === action.payload.id)
            let updatedUser = state.list[index]
            for (let key in action.payload) {
                updatedUser[key] = action.payload[key]
            }
        },
        filterTodos: (state, action) => {
            
            state.filteredList = [...state.list];
            state.filtered = false
            if (Object.keys(action.payload).length !== 0) {
                const filteredListCopy = state.filteredList.map(item => ({ ...item, todos: [...item.todos] }));
                for (let key of Object.keys(action.payload)) {
                    let filterValue = action.payload[key]
                    for (let i = 0; i < state.filteredList.length; i++) {
                        if (key === 'client'){
                            filteredListCopy[i].todos = state.list[i].todos.filter(todo => todo.client.name.includes(filterValue))
                        } else {
                            filteredListCopy[i].todos = state.list[i].todos.filter(todo => todo[key] == filterValue)
                        }
                    }
                }
                state.filteredList = filteredListCopy;
                const filterChanged = JSON.stringify(state.filteredList) !== JSON.stringify(state.list);
                if (filterChanged){
                    console.log('change')
                    state.filtered = true
                }
            } 

        }
    },
})
export const { setTodos, addUser, updateUser, deleteUser, filterTodos } = todosSlice.actions;
export default todosSlice.reducer;