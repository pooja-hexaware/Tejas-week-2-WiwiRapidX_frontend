import store from 'store/store'
import { orderAdded, orderDeleted, orderUpdated } from '../orderSlice'

describe('testing order redux store reducers', () => {
    test('add order to store test', () => {
        let state = store.getState().order
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            storeId: 'storeId',
            personName: 'personName',
            street: 'street',
            postalcode: 'postalcode',
            city: 'city',
            OrderItem: 'OrderItem',
            mobile: 61,
        }
        store.dispatch(orderAdded(initialInput))
        state = store.getState().order
        expect(state.entities).toHaveLength(1)
    })

    test('update order from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            storeId: 'storeId',
            personName: 'personName',
            street: 'street',
            postalcode: 'postalcode',
            city: 'city',
            OrderItem: 'OrderItem',
            mobile: 66,
        }
        store.dispatch(orderAdded(initialInput))
        let state = store.getState().order
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            storeId: 'storeId1',
            personName: 'personName1',
            street: 'street1',
            postalcode: 'postalcode1',
            city: 'city1',
            OrderItem: 'OrderItem1',
            mobile: 14,
        }
        store.dispatch(orderUpdated(updatedInput))
        state = store.getState().order
        let changedOrder = state.entities.find((p) => p.id === 2)
        expect(changedOrder).toStrictEqual(updatedInput)
    })

    test('delete order from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            storeId: 'storeId',
            personName: 'personName',
            street: 'street',
            postalcode: 'postalcode',
            city: 'city',
            OrderItem: 'OrderItem',
            mobile: 78,
        }
        store.dispatch(orderAdded(initialInput))
        let state = store.getState().order
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            orderDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().order
        expect(state.entities).toHaveLength(2)
    })
})
