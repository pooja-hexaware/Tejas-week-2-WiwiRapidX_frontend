import { configureStore } from '@reduxjs/toolkit'
import orderReducer from '../views/order/store/orderSlice'
import ToppingReducer from '../views/Topping/store/ToppingSlice'
import MenuReducer from '../views/Menu/store/MenuSlice'
import StoreReducer from '../views/Store/store/StoreSlice'
import CartReducer from '../views/Store/store/CartSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        Store: StoreReducer,
        Menu: MenuReducer,
        Topping: ToppingReducer,
        order: orderReducer,
        Cart: CartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
