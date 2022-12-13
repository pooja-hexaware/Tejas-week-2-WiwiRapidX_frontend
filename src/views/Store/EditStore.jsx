import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editStore } from './store/Store.action'
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

const EditStore = () => {
    const { id: StoreId } = useParams()

    const Store = useSelector((state) =>
        state.Store.entities.find(
            (Store) => Store._id.toString() === StoreId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storeName, setStoreName] = useState(Store.storeName)
    const [address, setAddress] = useState(Store.address)
    const [zip, setZip] = useState(Store.zip)
    const [city, setCity] = useState(Store.city)
    const [state, setState] = useState(Store.state)
    const [storePhone, setStorePhone] = useState(Store.storePhone)
    const [kitchenPhone, setKitchenPhone] = useState(Store.kitchenPhone)
    const [menu, setMenu] = useState(Store.menu)

    const handleStoreName = (e) => setStoreName(e.target.value)
    const handleAddress = (e) => setAddress(e.target.value)
    const handleZip = (e) => setZip(e.target.value)
    const handleCity = (e) => setCity(e.target.value)
    const handleState = (e) => setState(e.target.value)
    const handleStorePhone = (e) => setStorePhone(e.target.value)
    const handleKitchenPhone = (e) => setKitchenPhone(e.target.value)
    const handleMenu = (e) => setMenu(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editStore({
                id: StoreId,
                storeName,
                address,
                zip,
                city,
                state,
                storePhone,
                kitchenPhone,
                menu,
            })
        )
        navigate('/Store')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditStore', path: '/Store' },
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
                                name="storeName"
                                id="storeNameInput"
                                onChange={handleStoreName}
                                value={storeName}
                                validators={['required']}
                                label="StoreName"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="address"
                                id="addressInput"
                                onChange={handleAddress}
                                value={address}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="zip"
                                id="zipInput"
                                onChange={handleZip}
                                value={zip}
                                validators={['required']}
                                label="Zip"
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
                                name="state"
                                id="stateInput"
                                onChange={handleState}
                                value={state}
                                validators={['required']}
                                label="State"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="storePhone"
                                id="storePhoneInput"
                                onChange={handleStorePhone}
                                value={storePhone}
                                validators={['required']}
                                label="StorePhone"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="kitchenPhone"
                                id="kitchenPhoneInput"
                                onChange={handleKitchenPhone}
                                value={kitchenPhone}
                                validators={['required']}
                                label="KitchenPhone"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="Menu"
                                id="menuInput"
                                onChange={handleMenu}
                                value={menu}
                                validators={['required']}
                                label="Menu"
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

export default EditStore
