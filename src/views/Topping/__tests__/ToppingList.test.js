const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ToppingList from '../ToppingList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Topping rows when api response has data', async () => {
    const endPoint = 'topping'
    const getToppingListResponse = [
        {
            id: 1,
            ToppingName: 'ToppingName1',
            ToppingPrice: 54,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getToppingListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ToppingList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const toppingToppingNameCell = await screen.findByText(/ToppingName1/i)

    expect(toppingToppingNameCell).toHaveTextContent(/ToppingName1/i)
    mock.reset()
})
