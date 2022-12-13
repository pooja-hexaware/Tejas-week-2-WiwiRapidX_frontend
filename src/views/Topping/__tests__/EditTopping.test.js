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
import EditTopping from '../EditTopping'
import { ToppingAdded } from '../store/ToppingSlice'
beforeAll(() => {
    store.dispatch(
        ToppingAdded({
            id: 1,
            ToppingName: 'ToppingName',
            ToppingPrice: 79,
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
                                element={
                                    <Navigate to="Topping/edit/1" replace />
                                }
                            />
                            <Route
                                path="Topping/edit/:id"
                                element={<EditTopping />}
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

describe('testing view of ToppingEdit Component', () => {
    test('should render EditTopping and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveToppingButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const ToppingNameElement = screen.getByLabelText(/ToppingName/i)
        const ToppingPriceElement = screen.getByLabelText(/ToppingPrice/i)

        expect(saveToppingButtonElement).toBeInTheDocument()

        expect(ToppingNameElement).toBeInTheDocument()
        expect(ToppingPriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Topping edit form', async () => {
        const ToppingNameElement = screen.getByLabelText(/ToppingName/i)
        const ToppingPriceElement = screen.getByLabelText(/ToppingPrice/i)

        fireEvent.change(ToppingNameElement, {
            target: { value: 'ToppingName' },
        })
        fireEvent.change(ToppingPriceElement, { target: { value: 89 } })

        expect(ToppingNameElement.value).toBe('ToppingName')

        expect(ToppingPriceElement.value).toBe('89')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const ToppingNameElement = screen.getByLabelText(/ToppingName/i)
        const ToppingPriceElement = screen.getByLabelText(/ToppingPrice/i)

        fireEvent.change(ToppingNameElement, { target: { value: '' } })
        fireEvent.change(ToppingPriceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveToppingButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveToppingButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
