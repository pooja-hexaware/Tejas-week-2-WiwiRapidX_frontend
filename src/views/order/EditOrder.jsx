import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editOrder } from './store/order.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

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

const EditOrder = () => {
    const { id: orderId } = useParams()

    const order = useSelector((state) =>
        state.order.entities.find(
            (order) => order.id.toString() === orderId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storeId, setStoreId] = useState(order.storeId)
    const [personName, setPersonName] = useState(order.personName)
    const [street, setStreet] = useState(order.street)
    const [postalcode, setPostalcode] = useState(order.postalcode)
    const [city, setCity] = useState(order.city)
    const [orderItem, setOrderItem] = useState(order.orderItem)
    const [mobile, setMobile] = useState(order.mobile)

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
            editOrder({
                id: orderId,
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

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditOrder', path: '/order' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
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
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditOrder
