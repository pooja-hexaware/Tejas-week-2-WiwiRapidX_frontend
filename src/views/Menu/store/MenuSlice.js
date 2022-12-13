import { createSlice } from '@reduxjs/toolkit'
import { fetchMenu } from './Menu.action'
import { addMenu } from './Menu.action'
import { editMenu } from './Menu.action'
import { deleteMenu } from './Menu.action'

const fetchMenuExtraReducer = {
    [fetchMenu.pending]: (state, action) => {
        state.loading = true
    },
    [fetchMenu.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchMenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const addMenuExtraReducer = {
    [addMenu.pending]: (state, action) => {
        state.loading = true
    },
    [addMenu.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addMenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const editMenuExtraReducer = {
    [editMenu.pending]: (state, action) => {
        state.loading = true
    },
    [editMenu.fulfilled]: (state, action) => {
        const { id, foodName, description, foodPrice, toppings } =
            action.payload
        const existingMenu = state.entities.find(
            (Menu) => Menu.id.toString() === id.toString()
        )
        if (existingMenu) {
            existingMenu.foodName = foodName
            existingMenu.description = description
            existingMenu.foodPrice = foodPrice
            existingMenu.toppings = toppings
        }
        state.loading = false
    },
    [editMenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteMenuExtraReducer = {
    [deleteMenu.pending]: (state, action) => {
        state.loading = true
    },
    [deleteMenu.fulfilled]: (state, action) => {
        const id = action.payload
        const existingMenu = state.entities.find(
            (Menu) => Menu.id.toString() === id.toString()
        )
        if (existingMenu) {
            state.entities = state.entities.filter((Menu) => Menu.id !== id)
        }
        state.loading = false
    },
    [deleteMenu.rejected]: (state, action) => {
        state.loading = false
    },
}
const MenuSlice = createSlice({
    name: 'Menu',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        MenuAdded(state, action) {
            state.entities.push(action.payload)
        },
        MenuUpdated(state, action) {
            const { id, foodName, description, foodPrice, toppings } =
                action.payload
            const existingMenu = state.entities.find(
                (Menu) => Menu.id.toString() === id.toString()
            )
            if (existingMenu) {
                existingMenu.foodName = foodName
                existingMenu.description = description
                existingMenu.foodPrice = foodPrice
                existingMenu.toppings = toppings
            }
        },
        MenuDeleted(state, action) {
            const { id } = action.payload
            const existingMenu = state.entities.find(
                (Menu) => Menu.id.toString() === id.toString()
            )
            if (existingMenu) {
                state.entities = state.entities.filter((Menu) => Menu.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchMenuExtraReducer,
        ...addMenuExtraReducer,
        ...editMenuExtraReducer,
        ...deleteMenuExtraReducer,
    },
})

export const { MenuAdded, MenuUpdated, MenuDeleted } = MenuSlice.actions

export default MenuSlice.reducer
