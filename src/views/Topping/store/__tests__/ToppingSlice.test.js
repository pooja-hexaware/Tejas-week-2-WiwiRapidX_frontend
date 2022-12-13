import store from 'store/store'
import { toppingAdded, toppingDeleted, toppingUpdated } from '../toppingSlice'

describe('testing topping redux store reducers', () => {
    test('add topping to store test', () => {
        let state = store.getState().topping
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            ToppingName: 'ToppingName',
            ToppingPrice: 8,
        }
        store.dispatch(toppingAdded(initialInput))
        state = store.getState().topping
        expect(state.entities).toHaveLength(1)
    })

    test('update topping from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            ToppingName: 'ToppingName',
            ToppingPrice: 81,
        }
        store.dispatch(toppingAdded(initialInput))
        let state = store.getState().topping
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            ToppingName: 'ToppingName1',
            ToppingPrice: 61,
        }
        store.dispatch(toppingUpdated(updatedInput))
        state = store.getState().topping
        let changedTopping = state.entities.find((p) => p.id === 2)
        expect(changedTopping).toStrictEqual(updatedInput)
    })

    test('delete topping from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            ToppingName: 'ToppingName',
            ToppingPrice: 81,
        }
        store.dispatch(toppingAdded(initialInput))
        let state = store.getState().topping
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            toppingDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().topping
        expect(state.entities).toHaveLength(2)
    })
})
