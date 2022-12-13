import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addOrder } from './store/order.action'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

const AddOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storeId, setStoreId] = useState('')
    const [personName, setPersonName] = useState('')
    const [street, setStreet] = useState('')
    const [postalcode, setPostalcode] = useState('')
    const [city, setCity] = useState('')
    const [orderItem, setOrderItem] = useState('')
    const [mobile, setMobile] = useState('')

    const handleStoreId = (e) => setStoreId(e.target.value)
    const handlePersonName = (e) => setPersonName(e.target.value)
    const handleStreet = (e) => setStreet(e.target.value)
    const handlePostalcode = (e) => setPostalcode(e.target.value)
    const handleCity = (e) => setCity(e.target.value)
    const handleOrderItem = (e) => setOrderItem(e.target.value)
    const handleMobile = (e) => setMobile(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addOrder({
                storeId,
                personName,
                street,
                postalcode,
                city,
                orderItem,
                mobile,
            })
        )
        navigate('/order')
    }

    useEffect(() => {
        return () => {
            setStoreId('')
            setPersonName('')
            setStreet('')
            setPostalcode('')
            setCity('')
            setOrderItem('')
            setMobile('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddOrder', path: '/order' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="storeId"
                                id="storeIdInput"
                                onChange={handleStoreId}
                                value={storeId}
                                validators={['required']}
                                label="StoreId"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="personName"
                                id="personNameInput"
                                onChange={handlePersonName}
                                value={personName}
                                validators={['required']}
                                label="PersonName"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="street"
                                id="streetInput"
                                onChange={handleStreet}
                                value={street}
                                validators={['required']}
                                label="Street"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="postalcode"
                                id="postalcodeInput"
                                onChange={handlePostalcode}
                                value={postalcode}
                                validators={['required']}
                                label="Postalcode"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="city"
                                id="cityInput"
                                onChange={handleCity}
                                value={city}
                                validators={['required']}
                                label="City"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="OrderItem"
                                id="orderItemInput"
                                onChange={handleOrderItem}
                                value={orderItem}
                                validators={['required']}
                                label="OrderItem"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="mobile"
                                id="mobileInput"
                                onChange={handleMobile}
                                value={mobile || ''}
                                validators={['required']}
                                label="Mobile"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddOrder
