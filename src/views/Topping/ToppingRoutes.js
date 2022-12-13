import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ToppingList = Loadable(lazy(() => import('./ToppingList')))
const EditTopping = Loadable(lazy(() => import('./EditTopping')))
const AddTopping = Loadable(lazy(() => import('./AddTopping')))

const ToppingRoutes = [
    {
        path: '/Topping',
        element: <ToppingList />,
    },
    {
        path: '/Topping/edit/:id',
        element: <EditTopping />,
    },
    {
        path: '/Topping/add',
        element: <AddTopping />,
    },
]

export default ToppingRoutes
