import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const StoreList = Loadable(lazy(() => import('./StoreList')))
const EditStore = Loadable(lazy(() => import('./EditStore')))
const AddStore = Loadable(lazy(() => import('./AddStore')))
const StoreById = Loadable(lazy(() => import('./StoreById')))

const StoreRoutes = [
    {
        path: '/Store',
        element: <StoreList />,
    },
    {
        path: '/Store/edit/:id',
        element: <EditStore />,
    },
    {
        path: '/Store/:id',
        element: <StoreById />,
    },
    {
        path: '/Store/add',
        element: <AddStore />,
    },
]

export default StoreRoutes
