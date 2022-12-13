import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editTopping } from './store/Topping.action'
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

const EditTopping = () => {
    const { id: ToppingId } = useParams()

    const Topping = useSelector((state) =>
        state.Topping.entities.find(
            (Topping) => Topping.id.toString() === ToppingId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [toppingName, setToppingName] = useState(Topping.toppingName)
    const [toppingPrice, setToppingPrice] = useState(Topping.toppingPrice)

    const handleToppingName = (e) => setToppingName(e.target.value)
    const handleToppingPrice = (e) => setToppingPrice(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editTopping({
                id: ToppingId,
                toppingName,
                toppingPrice,
            })
        )
        navigate('/Topping')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditTopping', path: '/Topping' },
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
                                name="ToppingName"
                                id="toppingNameInput"
                                onChange={handleToppingName}
                                value={toppingName}
                                validators={['required']}
                                label="ToppingName"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="ToppingPrice"
                                id="toppingPriceInput"
                                onChange={handleToppingPrice}
                                value={toppingPrice || ''}
                                validators={['required']}
                                label="ToppingPrice"
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

export default EditTopping
