import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Topping'

export const fetchTopping = createAsyncThunk(
    'Topping/fetchTopping',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Topping = await response.data
        return Topping
    }
)

export const addTopping = createAsyncThunk(
    'Topping/addTopping',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Topping = await response.data
        thunkAPI.dispatch(showSuccess('Topping added successfully'))
        return Topping
    }
)

export const editTopping = createAsyncThunk(
    'Topping/editTopping',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Topping = await response.data
        thunkAPI.dispatch(showSuccess('Topping updated successfully'))
        return Topping
    }
)

export const deleteTopping = createAsyncThunk(
    'Topping/deleteTopping',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Topping deleted successfully.')
            )
            return data.id
        }
    }
)
