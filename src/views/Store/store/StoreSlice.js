import { createSlice } from '@reduxjs/toolkit'
import { fetchStore } from './Store.action'
import { addStore } from './Store.action'
import { editStore } from './Store.action'
import { deleteStore } from './Store.action'

const fetchStoreExtraReducer = {
    [fetchStore.pending]: (state, action) => {
        state.loading = true
    },
    [fetchStore.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchStore.rejected]: (state, action) => {
        state.loading = false
    },
}

const addStoreExtraReducer = {
    [addStore.pending]: (state, action) => {
        state.loading = true
    },
    [addStore.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addStore.rejected]: (state, action) => {
        state.loading = false
    },
}

const editStoreExtraReducer = {
    [editStore.pending]: (state, action) => {
        state.loading = true
    },
    [editStore.fulfilled]: (state, action) => {
        const {
            id,
            storeName,
            address,
            zip,
            city,
            State,
            storePhone,
            kitchenPhone,
            menu,
        } = action.payload
        const existingStore = state.entities.find(
            (Store) => Store.id.toString() === id.toString()
        )
        if (existingStore) {
            existingStore.storeName = storeName
            existingStore.address = address
            existingStore.zip = zip
            existingStore.city = city
            existingStore.state = State
            existingStore.storePhone = storePhone
            existingStore.kitchenPhone = kitchenPhone
            existingStore.menu = menu
        }
        state.loading = false
    },
    [editStore.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteStoreExtraReducer = {
    [deleteStore.pending]: (state, action) => {
        state.loading = true
    },
    [deleteStore.fulfilled]: (state, action) => {
        const id = action.payload
        const existingStore = state.entities.find(
            (Store) => Store.id.toString() === id.toString()
        )
        if (existingStore) {
            state.entities = state.entities.filter((Store) => Store.id !== id)
        }
        state.loading = false
    },
    [deleteStore.rejected]: (state, action) => {
        state.loading = false
    },
}
const StoreSlice = createSlice({
    name: 'Store',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        StoreAdded(state, action) {
            state.entities.push(action.payload)
        },
        StoreUpdated(state, action) {
            const {
                id,
                storeName,
                address,
                zip,
                city,
                State,
                storePhone,
                kitchenPhone,
                menu,
            } = action.payload
            const existingStore = state.entities.find(
                (Store) => Store.id.toString() === id.toString()
            )
            if (existingStore) {
                existingStore.storeName = storeName
                existingStore.address = address
                existingStore.zip = zip
                existingStore.city = city
                existingStore.state = State
                existingStore.storePhone = storePhone
                existingStore.kitchenPhone = kitchenPhone
                existingStore.menu = menu
            }
        },
        StoreDeleted(state, action) {
            const { id } = action.payload
            const existingStore = state.entities.find(
                (Store) => Store.id.toString() === id.toString()
            )
            if (existingStore) {
                state.entities = state.entities.filter(
                    (Store) => Store.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchStoreExtraReducer,
        ...addStoreExtraReducer,
        ...editStoreExtraReducer,
        ...deleteStoreExtraReducer,
    },
})

export const { StoreAdded, StoreUpdated, StoreDeleted } = StoreSlice.actions

export default StoreSlice.reducer
