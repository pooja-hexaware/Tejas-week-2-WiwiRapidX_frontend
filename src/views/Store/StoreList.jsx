import React, { useEffect } from 'react'
import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteStore, fetchStore } from './store/Store.action'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import { CircularProgress, IconButton } from '@mui/material'
import { Button, Icon } from '@mui/material'

import Card from '@mui/material/Card';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const StoreList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.Store)
    const loading = useSelector((state) => state.Store.loading)

    const handleDelete = (id) => {
        dispatch(deleteStore({ id }))
    }

    const handleVisit = (id) => {
        navigate(`/Store/${id}`)
    }

    const handleEdit = (id) => {
        navigate(`/Store/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/Store/add`)
    }

    useEffect(() => {
        dispatch(fetchStore())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        { field: 'storeName', headerName: 'StoreName', width: 200, 
           
        },
        {  field: {renderCell:(cellValues) =>{ 
                return(<>
                    <Button onClick={() => {
                        handleVisit(cellValues.row._id)
                    }} >
                        Visit
                    </Button>
                 </>)}
                 } , headerName: 'Visit',
                 renderCell:(cellValues) =>{ 
                    return(<>
                        <Button onClick={() => {
                            handleVisit(cellValues.row._id)
                        }} >
                            Visit
                        </Button>
                     </>)}  },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'zip', headerName: 'Zip', width: 200 },
        // { field: 'city', headerName: 'City', width: 200 },
        // { field: 'state', headerName: 'State', width: 200 },
        // { field: 'storePhone', headerName: 'StorePhone', width: 200 },
        // { field: 'kitchenPhone', headerName: 'KitchenPhone', width: 200 },
        // { field: 'menu', headerName: 'Menu', width: 200 },
        {
            field: 'Actions',
            flex: 1,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                handleEdit(cellValues.row._id)
                            }}
                            aria-label="Example"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                handleDelete(cellValues.row._id)
                            }}
                            aria-label="Example"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            },
        },
    ]
    return (

        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Entities', path: '/Store' },
                        { name: 'Store' },
                    ]}
                />
            </div>

            <Button
                onClick={() => {
                    handleAdd()
                }}
                color="primary"
                variant="contained"
            >
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                    Add Store
                </Span>
            </Button>

            <Card title="Store">
                {loading ? (
                    <div
                        title="loading"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress className="progress" />
                    </div>
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                )}
            </Card>
        </Container>
    )
}

export default StoreList
