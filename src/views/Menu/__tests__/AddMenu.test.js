const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddMenu from '../AddMenu'

beforeEach(() => {
    const endPoint = 'Menu'
    const getStudentListResponse = [
        {
            id: 1,
            foodName: 'foodName',
            description: 'description',
            foodPrice: 9,
            toppings: 'toppings',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddMenu />
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

describe('testing view MenuAdd Component', () => {
    test('should render AddMenu and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addMenuButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const foodNameElement = screen.getByLabelText(/FoodName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const foodPriceElement = screen.getByLabelText(/FoodPrice/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        expect(addMenuButtonElement).toBeInTheDocument()

        expect(foodNameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(foodPriceElement).toBeInTheDocument()
        expect(toppingsElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Menu add form', async () => {
        const foodNameElement = screen.getByLabelText(/FoodName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const foodPriceElement = screen.getByLabelText(/FoodPrice/i)
        const toppingsElement = screen.getByLabelText(/Toppings/i)

        fireEvent.change(foodNameElement, { target: { value: 'foodName' } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
        fireEvent.change(foodPriceElement, { target: { value: 99 } })
        fireEvent.change(toppingsElement, { target: { value: 'toppings' } })
    })

    test('should return error message when add Menu button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addMenuButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addMenuButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
