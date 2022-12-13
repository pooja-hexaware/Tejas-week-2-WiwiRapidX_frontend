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
import AddTopping from '../AddTopping'

beforeEach(() => {
    const endPoint = 'Topping'
    const getStudentListResponse = [
        {
            id: 1,
            ToppingName: 'ToppingName',
            ToppingPrice: 80,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddTopping />
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

describe('testing view ToppingAdd Component', () => {
    test('should render AddTopping and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addToppingButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const ToppingNameElement = screen.getByLabelText(/ToppingName/i)
        const ToppingPriceElement = screen.getByLabelText(/ToppingPrice/i)

        expect(addToppingButtonElement).toBeInTheDocument()

        expect(ToppingNameElement).toBeInTheDocument()
        expect(ToppingPriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Topping add form', async () => {
        const ToppingNameElement = screen.getByLabelText(/ToppingName/i)
        const ToppingPriceElement = screen.getByLabelText(/ToppingPrice/i)

        fireEvent.change(ToppingNameElement, {
            target: { value: 'ToppingName' },
        })
        fireEvent.change(ToppingPriceElement, { target: { value: 20 } })
    })

    test('should return error message when add Topping button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addToppingButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addToppingButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
