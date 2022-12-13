import { createSlice } from '@reduxjs/toolkit'
import { fetchTopping } from './Topping.action'
import { addTopping } from './Topping.action'
import { editTopping } from './Topping.action'
import { deleteTopping } from './Topping.action'

const fetchToppingExtraReducer = {
    [fetchTopping.pending]: (state, action) => {
        state.loading = true
    },
    [fetchTopping.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchTopping.rejected]: (state, action) => {
        state.loading = false
    },
}

const addToppingExtraReducer = {
    [addTopping.pending]: (state, action) => {
        state.loading = true
    },
    [addTopping.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addTopping.rejected]: (state, action) => {
        state.loading = false
    },
}

const editToppingExtraReducer = {
    [editTopping.pending]: (state, action) => {
        state.loading = true
    },
    [editTopping.fulfilled]: (state, action) => {
        const { id, toppingName, toppingPrice } = action.payload
        const existingTopping = state.entities.find(
            (Topping) => Topping.id.toString() === id.toString()
        )
        if (existingTopping) {
            existingTopping.toppingName = toppingName
            existingTopping.toppingPrice = toppingPrice
        }
        state.loading = false
    },
    [editTopping.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteToppingExtraReducer = {
    [deleteTopping.pending]: (state, action) => {
        state.loading = true
    },
    [deleteTopping.fulfilled]: (state, action) => {
        const id = action.payload
        const existingTopping = state.entities.find(
            (Topping) => Topping.id.toString() === id.toString()
        )
        if (existingTopping) {
            state.entities = state.entities.filter(
                (Topping) => Topping.id !== id
            )
        }
        state.loading = false
    },
    [deleteTopping.rejected]: (state, action) => {
        state.loading = false
    },
}
const ToppingSlice = createSlice({
    name: 'Topping',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        ToppingAdded(state, action) {
            state.entities.push(action.payload)
        },
        ToppingUpdated(state, action) {
            const { id, toppingName, toppingPrice } = action.payload
            const existingTopping = state.entities.find(
                (Topping) => Topping.id.toString() === id.toString()
            )
            if (existingTopping) {
                existingTopping.toppingName = toppingName
                existingTopping.toppingPrice = toppingPrice
            }
        },
        ToppingDeleted(state, action) {
            const { id } = action.payload
            const existingTopping = state.entities.find(
                (Topping) => Topping.id.toString() === id.toString()
            )
            if (existingTopping) {
                state.entities = state.entities.filter(
                    (Topping) => Topping.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchToppingExtraReducer,
        ...addToppingExtraReducer,
        ...editToppingExtraReducer,
        ...deleteToppingExtraReducer,
    },
})

export const { ToppingAdded, ToppingUpdated, ToppingDeleted } =
    ToppingSlice.actions

export default ToppingSlice.reducer
