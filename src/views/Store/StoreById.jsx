import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//import Button from '@mui/material/Button';
import { Span } from 'components/Typography'
//import { Button, Grid, MenuItem } from '@mui/material'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { Icon, Label } from 'semantic-ui-react';
import Nav from 'react-bootstrap/Nav';
import { CardContent, ListItem, TextField } from "@mui/material";
import Container from 'react-bootstrap/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { blue, lightBlue } from '@mui/material/colors';
import { Button, Image, List, Form } from 'semantic-ui-react'
import { updateMenu, clearActiveMenu,updateQuant } from "./store/CartSlice"
import { Controller, useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const defaultValues = {

    storeId: "",
    PersonName: "",
    street: '',
    postalCode: '',
    city: '',
    mobile: '',

}





const StoreById = () => {
    const { id } = useParams()
    const axios = require('axios').default;

    const [StoreVisit, setStoreVisit] = React.useState([])
    const [Amount, setAmount] = React.useState(1);
    const [toppings, setToppings] = React.useState([])
    const [selectToppingName, setSelectToppingName] = React.useState([]);

    const [openTopping, setOpenTopping] = React.useState(false);
    const handleOpenTopping = () => setOpenTopping(true);
    const handleCloseTopping = () => setOpenTopping(false);
    const [GrandAmount, setGrandAmount] = React.useState([]);
    var amo
    const [openCart, setOpenCart] = React.useState(false);
    const handleOpenCart = () => {
        setOpenCart(true);
        setGrandAmount(Cart?.map((menu) => menu.priceWithQunt))
    };
    amo = GrandAmount.reduce((prev, curr, index) => prev + curr, 0);
    const handleCloseCart = () => setOpenCart(false);

    const Cart = useSelector((state) => state.Cart.cart);




    const dispatch = useDispatch()

    const Store = useSelector((state) =>
        state.Store.entities.find(
            (Store) => Store._id.toString() === id.toString()
        )
    )

    const EmptyCart = () => {
        dispatch(clearActiveMenu())
        setCount(0)
    };

    const [openForm, setOpenForm] = React.useState(false);
    const handleOpenForm = () => {
        setOpenForm(true);
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const { control, watch, handleSubmit, formState } = useForm({
        mode: "onChange",
        defaultValues,

    });
    const storeId = watch("storeId")
    const PersonName = watch("PersonName")
    const street = watch("street")
    const postalCode = watch("postalCode")
    const city = watch("city")
    const mobile = watch("mobile")

    function onSubmit(data) {

        axios.post('http://localhost:8000/order', {
            storeId: id,
            personName: data.PersonName,
            street: data.street,
            postalCode: data.postalCode,
            city: data.city,
            mobile: data.mobile,
            OrderItem: Cart
        }).then(function (response) {
            console.log(response);
            window.alert('Order Submitted Successfully')
            handleCloseForm()
            handleCloseCart()
            dispatch(clearActiveMenu())
            setCount(0)

        })
    }


    const menus = Store.menu;
    console.log(menus)

    const updateMenus = (menuId, price, name) => {
        console.log("menu Id is", menuId)
        setStoreVisit(
            StoreVisit.map((menu) =>
                (menu._id == menuId) ? { foodPrice: menu.foodPrice += price, ...menu } : menu
            )
        )
        setSelectToppingName((oldArr) => [...oldArr, name])
    };
    console.log("topps", selectToppingName)

    const addMenus = (menu) => {

        console.log("menu", { ...menu })
        dispatch(updateMenu({ menuId: menu._id, menuName: menu.foodName, menuPrice: menu.foodPrice, quantity: Amount, toppings: selectToppingName }))
        setCount(Number(count + Amount));

        setSelectToppingName('');
       
        fetch("http://localhost:8000/Store/" + id)
            .then((response) => response.json())

            .then((data) => {

                setStoreVisit(data[0]?.menu)
            }
            )
       
    }
    const addQuant = (menu) => {
        console.log(menu)
       // dispatch(updateQuant(menu))
        //setCount(Number(count + Amount));

     }

    const { menu } = useSelector((state) => state.Menu.entities)

    useEffect(() => {

        fetch("http://localhost:8000/Store/" + id)
            .then((response) => response.json())

            .then((data) => {
                setStoreVisit(data[0]?.menu);

            }
            )

    }, []);
    const SelectPicFood = (foodname) => {
        if (foodname == 'Loaded Veggie') {
            return 'https://buildyourbite.com/wp-content/uploads/2019/02/veggie-nachos-28.jpg'
        }
        else if (foodname == "Hummus Falafel") {
            return 'https://i.pinimg.com/originals/0e/b5/2f/0eb52f7345490bea94871ae35fc800ad.jpg'
        }
        else if (foodname == "Feta Falafel") {
            return 'https://recipe-images.azureedge.net/Medium/26947371-3c99-40b9-baf9-cdd92cfbcb4e.jpg/'
        }
        else if (foodname == "Double Bagel") {
            return 'https://www.cookiemadness.net/wp-content/uploads/2016/05/doublechocolatebagels1.jpg'
        }
    }


    console.log("check store", StoreVisit)
    const [count, setCount] = React.useState(0);
    const [menu_id, setMenu_Id] = React.useState('')
    const popup = (data) => {
        console.log("data", data)
        setToppings(data[0]?.toppings)
        setMenu_Id(data[0]?._id)
        handleOpenTopping()
    }
    console.log("top", toppings)
    console.log("menu id", menu_id)
    const myStyle = {
        backgroundImage: `url('https://www.sanskrutirestaurant.co.uk/liverpool/wp-content/uploads/2019/04/0D3A5849-min.jpg')`,
        height: '120vh',
        marginTop: '-20px',
        fontSize: '13px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };


    return (
        <div style={myStyle}>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home"><h4>WiWi Food App (Capstone)</h4></Navbar.Brand>
                    <Nav className="me-auto">


                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand size="small" variant="outline-success">
                            <Button size="small" onClick={handleOpenCart}>
                                {count > 0 ? <h5><Label color='green' size="large" ><ShoppingCartSharpIcon sx={{ color: 'secondary' }}></ShoppingCartSharpIcon> Your Cart  ({count})</Label></h5> : <h5><Label color='black' size="large" ><ShoppingCartSharpIcon sx={{ color: 'secondary' }}></ShoppingCartSharpIcon> Your Cart  ({count})</Label></h5>
                                }
                            </Button>
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <br></br>
            <br></br>
            <>
                <Card variant="outlined" sx={{ mx: 10, bgcolor: blue[300] }}>

                    <CardContent>
                        <Typography variant="h5" component="div" color={lightBlue[50]} >
                            <b> Good Food,Great Time</b>
                        </Typography>
                        <Typography variant="body2">
                            Our chefs at WiWi make delicious food selections every week- you pick,we cook and deliver.
                            <br />
                        </Typography>
                    </CardContent>

                </Card>
                <br></br>
                <Card sx={{ mx: 30 }}>
                    <CardContent>
                        <List divided verticalAlign='middle'>
                            {
                                StoreVisit?.map((menu) => (
                                    <List.Item>

                                        <List.Content floated='right'>
                                            <List.Content size="mini" >
                                                <Box
                                                    sx={{
                                                        width: 100,
                                                        maxWidth: '100%',
                                                    }}
                                                >
                                                    <TextField
                                                        id="outlined-number"
                                                        label="Amount"
                                                        type="number"
                                                        size="small"
                                                        value={Amount}
                                                        onChange={(e) => { setAmount(Number(e.target.value)) }}

                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />{console.log("Amount", Amount)}
                                                </Box>
                                            </List.Content>
                                            <br></br>
                                            <List.Content>
                                                <Button color="green" onClick={() => addMenus(menu)}>Add</Button>
                                            </List.Content>
                                        </List.Content>


                                        <Image avatar src={SelectPicFood(menu?.foodName)} floated="left" />
                                        <br></br>
                                        <List.Content>
                                            <List.Header floated="left"><h6><b>{menu?.foodName}</b></h6></List.Header>
                                            <List.Description floated="left">
                                                {menu?.description}
                                            </List.Description>

                                            <br></br>

                                            <List.Content floated='left'>
                                                <Button onClick={() => {
                                                    fetch("http://localhost:8000/Menu/" + menu?._id)
                                                        .then((response) => response.json())

                                                        .then((data) => {
                                                            console.log("alo", data)

                                                            popup(data)
                                                        }
                                                        )

                                                }} color="orange" size="small">topings</Button>
                                            </List.Content>
                                            <List.Content floated="right"><h6 color="blue">Price $ {menu?.foodPrice}</h6></List.Content>
                                            <br></br>
                                        </List.Content>
                                    </List.Item>
                                ))}
                        </List>
                    </CardContent>
                </Card>
                <Modal
                    open={openTopping}
                    onClose={handleCloseTopping}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleBox}>
                        <List divided verticalAlign='middle'>
                            {toppings?.map((top) => (
                                <List.Item>
                                    <List.Content floated="left">
                                        <List.Header floated="left">{top?.ToppingName}</List.Header>

                                        {/* <Image avatar src={SelectPic(top?.ToppingName)} floated="left" /> */}
                                    </List.Content>
                                    <List.Content floated="right">
                                        <List.Header floated="right">$ {top?.ToppingPrice}</List.Header>

                                    </List.Content>
                                    <List.Content>
                                    </List.Content>
                                    <List.Content floated="right"><Button color="purple" onClick={() => {
                                        console.log("menu id is", menu_id)
                                        updateMenus(menu_id, top?.ToppingPrice, top?.ToppingName)


                                        //dispatch(addToppings({ toppingName: top?.ToppingName, toppingPrice: top?.ToppingPrice }))
                                        console.log("alis ka",)
                                    }}>Add</Button></List.Content>
                                </List.Item>
                            )

                            )

                            }
                        </List>
                    </Box>
                </Modal>
            </>
            <>
                <Modal
                    open={openCart}
                    onClose={handleCloseCart}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleBox}>
                        <List divided verticalAlign='middle'>
                            {Cart?.map((menu) => (
                                <List.Item>
                                    <List.Content floated="left">
                                        <List.Header floated="left"><h5>{menu?.menuName}</h5></List.Header>
                                        <List.Description floated="left">{menu?.toppings}</List.Description>
                                    </List.Content>

                                    
                                    <List.Content floated="left">
                                        <List.Header floated="left">      $ {menu?.menuPrice}</List.Header>
                                        <List.Description>          x {menu?.quantity} </List.Description>
                                    </List.Content>

                                   

                                    <List.Content floated="right">
                                        <List.Header floated="right">$ {menu?.priceWithQunt}</List.Header>

                                    </List.Content>



                                </List.Item>
                            )

                            )

                            }
                        </List>
                        <div>{count > 0 ? <h5><List.Item><Label color="green" size="large"> Total Price</Label> <Icon name='dollar sign' size='normal' />{amo}</List.Item></h5> : <h3>Your cart is empty</h3>}</div><br></br>
                        <div><List><List.Item floated="right">
                            <List.Content floated="right">
                                <List.Header floated="right">

                                </List.Header>
                            </List.Content>

                            <List.Content floated="right">
                                <List.Header floated="right">

                                    {count > 0 ? <Button color="orange" onClick={EmptyCart}> Empty Cart </Button> : ''}
                                    {count > 0 ?<Button color="green" onClick={handleOpenForm}> Order </Button> : ''}
                                    
                                </List.Header>
                            </List.Content>

                        </List.Item></List></div>
                    </Box>
                </Modal>
            </>
            <>
                <Modal
                    open={openForm}
                    onClose={handleCloseForm}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...styleBox, width: 500 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ ml: 1 }}>
                                <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                                    }}
                                >
                                    <Box sx={{ ml: 0 }}><h3>Details </h3></Box>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="PersonName"
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    id="PersonName"
                                                    label="Your name "
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={PersonName}
                                                    required
                                                    fullWidth
                                                    autoFocus

                                                />

                                            )} />

                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="street"
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    id="street"
                                                    label="Street"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={street}
                                                    required
                                                    fullWidth
                                                    autoFocus

                                                />

                                            )} />
                                    </div>

                                    <div>
                                        <Controller
                                            control={control}
                                            name="postalCode"
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    id="postalCode"
                                                    label="Postal code"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={postalCode}
                                                    required
                                                    fullWidth
                                                    autoFocus

                                                />

                                            )} />
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="city"
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    id="city"
                                                    label="City"
                                                    variant="outlined"
                                                    type="text"
                                                    size="small"
                                                    value={city}
                                                    required
                                                    fullWidth
                                                    autoFocus

                                                />

                                            )} />
                                    </div>

                                    <div>
                                        <Controller
                                            control={control}
                                            name="mobile"
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    id="mobile"
                                                    label="Mobile"
                                                    variant="outlined"
                                                    type="mobile"
                                                    size="small"
                                                    value={mobile}
                                                    required
                                                    fullWidth
                                                    autoFocus

                                                />

                                            )} />
                                    </div>

                                    <Button onClick={handleCloseForm} color="red">Cancel</Button>
                                    <Button type='submit' color="green">Submit</Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>

                </Modal>
            </>

        </div >
    )
}
export default StoreById