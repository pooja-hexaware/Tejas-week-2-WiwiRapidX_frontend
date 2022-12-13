import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Store'

export const fetchStore = createAsyncThunk('Store/fetchStore', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Store = await response.data
    return Store
})


export const fetchStoreById = createAsyncThunk('Store/fetchStoreById', async (id) => {
    const response = await axios.get(`/${endPoint}/${id}`)
    const Store = await response.data
    return Store
})

export const addStore = createAsyncThunk(
    'Store/addStore',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Store = await response.data
        thunkAPI.dispatch(showSuccess('Store added successfully'))
        return Store
    }
)

export const editStore = createAsyncThunk(
    'Store/editStore',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Store = await response.data
        thunkAPI.dispatch(showSuccess('Store updated successfully'))
        return Store
    }
)

export const deleteStore = createAsyncThunk(
    'Store/deleteStore',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Store deleted successfully.')
            )
            return data.id
        }
    }
)
