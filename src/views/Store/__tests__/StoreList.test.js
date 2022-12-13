const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import StoreList from '../StoreList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Store rows when api response has data', async () => {
    const endPoint = 'store'
    const getStoreListResponse = [
        {
            id: 1,
            storeName: 'storeName1',
            address: 'address1',
            zip: 'zip1',
            city: 'city1',
            state: 'state1',
            storePhone: 'storePhone1',
            kitchenPhone: 'kitchenPhone1',
            Menu: 'Menu1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStoreListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <StoreList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const storeStoreNameCell = await screen.findByText(/storeName1/i)

    expect(storeStoreNameCell).toHaveTextContent(/storeName1/i)
    mock.reset()
})
