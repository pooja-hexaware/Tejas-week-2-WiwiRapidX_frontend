const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditMenu from '../EditMenu'
import { MenuAdded } from '../store/MenuSlice'
beforeAll(() => {
    store.dispatch(
        MenuAdded({
            id: 1,
            foodName: 'foodName',
            description: 'description',
            foodPrice: 100,
            toppings: 'toppings',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="Menu/edit/1" replace />}
                            />
                            <Route
                                path="Menu/edit/:id"
                                element={<EditMenu />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of MenuEdit Component', () => {
    test('should render EditMenu and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveMenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const foodNameElement = screen.getByLabelText(/FoodName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const foodPriceElement = screen.getByLabelText(/FoodPrice/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        expect(saveMenuButtonElement).toBeInTheDocument()

        expect(foodNameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(foodPriceElement).toBeInTheDocument()
        expect(toppingsElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Menu edit form', async () => {
        const foodNameElement = screen.getByLabelText(/FoodName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const foodPriceElement = screen.getByLabelText(/FoodPrice/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        fireEvent.change(foodNameElement, { target: { value: 'foodName' } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
        fireEvent.change(foodPriceElement, { target: { value: 88 } })
        fireEvent.change(toppingsElement, { target: { value: 'toppings' } })

        expect(foodNameElement.value).toBe('foodName')

        expect(descriptionElement.value).toBe('description')

        expect(foodPriceElement.value).toBe('88')
        expect(toppingsElement.value).toBe('toppings')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const foodNameElement = screen.getByLabelText(/FoodName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const foodPriceElement = screen.getByLabelText(/FoodPrice/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        fireEvent.change(foodNameElement, { target: { value: '' } })
        fireEvent.change(descriptionElement, { target: { value: '' } })
        fireEvent.change(foodPriceElement, { target: { value: '' } })
        fireEvent.change(toppingsElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveMenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveMenuButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
