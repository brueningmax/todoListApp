import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        list: []
    },
    reducers: {
        setClients: (state, action) => {
            state.list = action.payload;
        },
        // addClient: (state, action) => {
        //     state.list.push(action.payload)
        //     state.list.sort((a, b) => a.name.localeCompare(b.name))
        // },
        updateClient: (state, action) => {
            let index = state.list.findIndex(client => client.id === action.payload.id)
            let updatedClient = state.list[index]
            for (let key in action.payload) {
                updatedClient[key] = action.payload[key]
            }
        },
        deleteClient: (state, action) => {
            let indexToDelete = state.list.findIndex(client => client.id === action.payload)
            state.list.splice(indexToDelete, 1)
        },
    }
})
export const { setClients, updateClient, deleteClient, addClient } = clientSlice.actions;
export default clientSlice.reducer;