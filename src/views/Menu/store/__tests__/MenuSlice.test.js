import store from 'store/store'
import { menuAdded, menuDeleted, menuUpdated } from '../menuSlice'

describe('testing menu redux store reducers', () => {
    test('add menu to store test', () => {
        let state = store.getState().menu
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            foodName: 'foodName',
            description: 'description',
            foodPrice: 45,
            toppings: 'toppings',
        }
        store.dispatch(menuAdded(initialInput))
        state = store.getState().menu
        expect(state.entities).toHaveLength(1)
    })

    test('update menu from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            foodName: 'foodName',
            description: 'description',
            foodPrice: 85,
            toppings: 'toppings',
        }
        store.dispatch(menuAdded(initialInput))
        let state = store.getState().menu
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            foodName: 'foodName1',
            description: 'description1',
            foodPrice: 86,
            toppings: 'toppings1',
        }
        store.dispatch(menuUpdated(updatedInput))
        state = store.getState().menu
        let changedMenu = state.entities.find((p) => p.id === 2)
        expect(changedMenu).toStrictEqual(updatedInput)
    })

    test('delete menu from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            foodName: 'foodName',
            description: 'description',
            foodPrice: 99,
            toppings: 'toppings',
        }
        store.dispatch(menuAdded(initialInput))
        let state = store.getState().menu
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            menuDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().menu
        expect(state.entities).toHaveLength(2)
    })
})
