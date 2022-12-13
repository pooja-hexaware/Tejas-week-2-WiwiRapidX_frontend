import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchTopping,
    addTopping,
    editTopping,
    deleteTopping,
} from '../topping.action'

const getToppingListResponse = [
    {
        id: 1,
        ToppingName: 'ToppingName',
        ToppingPrice: 51,
    },
]

const addToppingListResponse = (data) => {
    return { id: 2, ...data }
}
const editToppingListResponse = (data) => {
    return data
}

describe('should test Topping redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'topping'
    test('Should be able to fetch the topping list and update topping redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getToppingListResponse)
        const result = await store.dispatch(fetchTopping())
        const toppingList = result.payload
        expect(result.type).toBe('topping/fetchTopping/fulfilled')
        expect(toppingList).toEqual(getToppingListResponse)

        const state = store.getState().topping
        expect(state.entities).toEqual(toppingList)
    })

    test('Should be able to add new topping to list and make post api and update topping redux store', async () => {
        const body = {
            ToppingName: 'ToppingName',
            ToppingPrice: 70,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addToppingListResponse(body)
        )
        const result = await store.dispatch(addTopping(body))
        const toppingItem = result.payload
        expect(result.type).toBe('topping/addTopping/fulfilled')
        expect(toppingItem).toEqual(addToppingListResponse(body))

        const state = store.getState().topping
        expect(state.entities).toContainEqual(addToppingListResponse(body))
    })

    test('Should be able to edit topping in list and make put api call and update topping redux store', async () => {
        const body = {
            id: 1,
            ToppingName: 'ToppingName',
            ToppingPrice: 30,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editToppingListResponse(body)
        )
        const result = await store.dispatch(editTopping(body))
        const toppingItem = result.payload
        expect(result.type).toBe('topping/editTopping/fulfilled')
        expect(toppingItem).toEqual(editToppingListResponse(body))

        const state = store.getState().topping
        let changedTopping = state.entities.find((p) => p.id === body.id)
        expect(changedTopping.name).toEqual(body.name)
    })

    test('Should be able to delete topping in list and update topping redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().topping
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteTopping(input))
        const deletId = result.payload
        expect(result.type).toBe('topping/deleteTopping/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().topping
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
