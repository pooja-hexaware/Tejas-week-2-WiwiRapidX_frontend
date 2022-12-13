import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editMenu } from './store/Menu.action'
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

const EditMenu = () => {
    const { id: MenuId } = useParams()

    const Menu = useSelector((state) =>
        state.Menu.entities.find(
            (Menu) => Menu.id.toString() === MenuId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [foodName, setFoodName] = useState(Menu.foodName)
    const [description, setDescription] = useState(Menu.description)
    const [foodPrice, setFoodPrice] = useState(Menu.foodPrice)
    const [toppings, setToppings] = useState(Menu.toppings)

    const handleFoodName = (e) => setFoodName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleFoodPrice = (e) => setFoodPrice(parseInt(e.target.value))
    const handleToppings = (e) => setToppings(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editMenu({
                id: MenuId,
                foodName,
                description,
                foodPrice,
                toppings,
            })
        )
        navigate('/Menu')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditMenu', path: '/Menu' },
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
                                name="foodName"
                                id="foodNameInput"
                                onChange={handleFoodName}
                                value={foodName}
                                validators={['required']}
                                label="FoodName"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="description"
                                id="descriptionInput"
                                onChange={handleDescription}
                                value={description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="foodPrice"
                                id="foodPriceInput"
                                onChange={handleFoodPrice}
                                value={foodPrice || ''}
                                validators={['required']}
                                label="FoodPrice"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="toppings"
                                id="toppingsInput"
                                onChange={handleToppings}
                                value={toppings}
                                validators={['required']}
                                label="Toppings"
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

export default EditMenu
