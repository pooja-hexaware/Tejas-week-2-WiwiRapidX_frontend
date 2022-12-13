import NotFound from 'views/sessions/NotFound'
import orderRoutes from 'views/order/OrderRoutes'
import ToppingRoutes from 'views/Topping/ToppingRoutes'
import MenuRoutes from 'views/Menu/MenuRoutes'
import StoreRoutes from 'views/Store/StoreRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [
                ...homeRoutes,
                ...StoreRoutes,
                ...MenuRoutes,
                ...ToppingRoutes,
                ...orderRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
