import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Menu'

export const fetchMenu = createAsyncThunk('Menu/fetchMenu', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Menu = await response.data
    return Menu
})

export const addMenu = createAsyncThunk(
    'Menu/addMenu',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Menu = await response.data
        thunkAPI.dispatch(showSuccess('Menu added successfully'))
        return Menu
    }
)

export const editMenu = createAsyncThunk(
    'Menu/editMenu',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Menu = await response.data
        thunkAPI.dispatch(showSuccess('Menu updated successfully'))
        return Menu
    }
)

export const deleteMenu = createAsyncThunk(
    'Menu/deleteMenu',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Menu deleted successfully.')
            )
            return data.id
        }
    }
)
