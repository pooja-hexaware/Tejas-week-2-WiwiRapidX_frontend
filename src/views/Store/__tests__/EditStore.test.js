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
import EditStore from '../EditStore'
import { StoreAdded } from '../store/StoreSlice'
beforeAll(() => {
    store.dispatch(
        StoreAdded({
            id: 1,
            storeName: 'storeName',
            address: 'address',
            zip: 'zip',
            city: 'city',
            state: 'state',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            Menu: 'Menu',
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
                                element={<Navigate to="Store/edit/1" replace />}
                            />
                            <Route
                                path="Store/edit/:id"
                                element={<EditStore />}
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

describe('testing view of StoreEdit Component', () => {
    test('should render EditStore and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStoreButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const storeNameElement = screen.getByLabelText(/StoreName/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateElement = screen.getByLabelText(/State/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)
        const MenuElement = screen.getByLabelText(/Menu/i)

        expect(saveStoreButtonElement).toBeInTheDocument()

        expect(storeNameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(zipElement).toBeInTheDocument()
        expect(cityElement).toBeInTheDocument()
        expect(stateElement).toBeInTheDocument()
        expect(storePhoneElement).toBeInTheDocument()
        expect(kitchenPhoneElement).toBeInTheDocument()
        expect(MenuElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Store edit form', async () => {
        const storeNameElement = screen.getByLabelText(/StoreName/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateElement = screen.getByLabelText(/State/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)
        const MenuElement = screen.getByLabelText(/Menu/i)

        fireEvent.change(storeNameElement, { target: { value: 'storeName' } })
        fireEvent.change(addressElement, { target: { value: 'address' } })
        fireEvent.change(zipElement, { target: { value: 'zip' } })
        fireEvent.change(cityElement, { target: { value: 'city' } })
        fireEvent.change(stateElement, { target: { value: 'state' } })
        fireEvent.change(storePhoneElement, { target: { value: 'storePhone' } })
        fireEvent.change(kitchenPhoneElement, {
            target: { value: 'kitchenPhone' },
        })
        fireEvent.change(MenuElement, { target: { value: 'Menu' } })

        expect(storeNameElement.value).toBe('storeName')

        expect(addressElement.value).toBe('address')

        expect(zipElement.value).toBe('zip')

        expect(cityElement.value).toBe('city')

        expect(stateElement.value).toBe('state')

        expect(storePhoneElement.value).toBe('storePhone')

        expect(kitchenPhoneElement.value).toBe('kitchenPhone')

        expect(MenuElement.value).toBe('Menu')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const storeNameElement = screen.getByLabelText(/StoreName/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateElement = screen.getByLabelText(/State/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)
        const MenuElement = screen.getByLabelText(/Menu/i)

        fireEvent.change(storeNameElement, { target: { value: '' } })
        fireEvent.change(addressElement, { target: { value: '' } })
        fireEvent.change(zipElement, { target: { value: '' } })
        fireEvent.change(cityElement, { target: { value: '' } })
        fireEvent.change(stateElement, { target: { value: '' } })
        fireEvent.change(storePhoneElement, { target: { value: '' } })
        fireEvent.change(kitchenPhoneElement, { target: { value: '' } })
        fireEvent.change(MenuElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveStoreButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStoreButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(8)
    })
})
