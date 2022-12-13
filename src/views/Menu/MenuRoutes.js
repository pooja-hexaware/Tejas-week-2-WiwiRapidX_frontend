import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const MenuList = Loadable(lazy(() => import('./MenuList')))
const EditMenu = Loadable(lazy(() => import('./EditMenu')))
const AddMenu = Loadable(lazy(() => import('./AddMenu')))

const MenuRoutes = [
    {
        path: '/Menu',
        element: <MenuList />,
    },
    {
        path: '/Menu/edit/:id',
        element: <EditMenu />,
    },
    {
        path: '/Menu/add',
        element: <AddMenu />,
    },
]

export default MenuRoutes
