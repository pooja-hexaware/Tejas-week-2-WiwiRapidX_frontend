const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import OrderList from '../OrderList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Order rows when api response has data', async () => {
    const endPoint = 'order'
    const getOrderListResponse = [
        {
            id: 1,
            storeId: 'storeId1',
            personName: 'personName1',
            street: 'street1',
            postalcode: 'postalcode1',
            city: 'city1',
            OrderItem: 'OrderItem1',
            mobile: 48,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getOrderListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <OrderList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const orderStoreIdCell = await screen.findByText(/storeId1/i)

    expect(orderStoreIdCell).toHaveTextContent(/storeId1/i)
    mock.reset()
})
