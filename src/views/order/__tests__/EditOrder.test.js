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
import EditOrder from '../EditOrder'
import { orderAdded } from '../store/orderSlice'
beforeAll(() => {
    store.dispatch(
        orderAdded({
            id: 1,
            storeId: 'storeId',
            personName: 'personName',
            street: 'street',
            postalcode: 'postalcode',
            city: 'city',
            OrderItem: 'OrderItem',
            mobile: 47,
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
                                element={<Navigate to="order/edit/1" replace />}
                            />
                            <Route
                                path="order/edit/:id"
                                element={<EditOrder />}
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

describe('testing view of OrderEdit Component', () => {
    test('should render EditOrder and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveOrderButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const storeIdElement = screen.getByLabelText(/StoreId/i)
        const personNameElement = screen.getByLabelText(/PersonName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)
        const OrderItemElement = screen.getByLabelText(/OrderItem/i)
        const mobileElement = screen.getByLabelText(/Mobile/i)

        expect(saveOrderButtonElement).toBeInTheDocument()

        expect(storeIdElement).toBeInTheDocument()
        expect(personNameElement).toBeInTheDocument()
        expect(streetElement).toBeInTheDocument()
        expect(postalcodeElement).toBeInTheDocument()
        expect(cityElement).toBeInTheDocument()
        expect(OrderItemElement).toBeInTheDocument()
        expect(mobileElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Order edit form', async () => {
        const storeIdElement = screen.getByLabelText(/StoreId/i)
        const personNameElement = screen.getByLabelText(/PersonName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)
        const OrderItemElement = screen.getByLabelText(/OrderItem/i)
        const mobileElement = screen.getByLabelText(/Mobile/i)

        fireEvent.change(storeIdElement, { target: { value: 'storeId' } })
        fireEvent.change(personNameElement, { target: { value: 'personName' } })
        fireEvent.change(streetElement, { target: { value: 'street' } })
        fireEvent.change(postalcodeElement, { target: { value: 'postalcode' } })
        fireEvent.change(cityElement, { target: { value: 'city' } })
        fireEvent.change(OrderItemElement, { target: { value: 'OrderItem' } })
        fireEvent.change(mobileElement, { target: { value: 51 } })

        expect(storeIdElement.value).toBe('storeId')

        expect(personNameElement.value).toBe('personName')

        expect(streetElement.value).toBe('street')

        expect(postalcodeElement.value).toBe('postalcode')

        expect(cityElement.value).toBe('city')

        expect(OrderItemElement.value).toBe('OrderItem')

        expect(mobileElement.value).toBe('51')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const storeIdElement = screen.getByLabelText(/StoreId/i)
        const personNameElement = screen.getByLabelText(/PersonName/i)
        const streetElement = screen.getByLabelText(/Street/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)
        const OrderItemElement = screen.getByLabelText(/OrderItem/i)
        const mobileElement = screen.getByLabelText(/Mobile/i)

        fireEvent.change(storeIdElement, { target: { value: '' } })
        fireEvent.change(personNameElement, { target: { value: '' } })
        fireEvent.change(streetElement, { target: { value: '' } })
        fireEvent.change(postalcodeElement, { target: { value: '' } })
        fireEvent.change(cityElement, { target: { value: '' } })
        fireEvent.change(OrderItemElement, { target: { value: '' } })
        fireEvent.change(mobileElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveOrderButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveOrderButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
