import { useState , useEffect} from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ProductsPageinate,
  CartCard,
  ProductCartWidget
} from '../components/_dashboard/products';
import { Grid ,Button} from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

import {GetCartProducts} from '../APIcalls/Products'
import {upadteCartItems} from '../redux/actions/cartActions';
import searchFill from '@iconify/icons-eva/search-fill';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Box, InputAdornment } from '@material-ui/core';
import {connect} from 'react-redux';
import { styled } from '@material-ui/core/styles';
const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));


function Cart(props) {

    const [search, setSearch] = useState('');
  
    const Products = useSelector((state) => state.cartReducer);

    const [totalPrice, setTotalPrice] = useState(0);
    
  const [filteredProducts, setFilteredProducts] = useState(Products);

    useEffect(() => {
        let userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : 1; 
        GetCartProducts(userId)
        .then((user) => {
          let price = 0;
          for(let i = 0; i < user.CartProducts.length;i++){
            price += parseInt(user.CartProducts[i].quantity)*parseInt(user.CartProducts[i].price);
          }
          setTotalPrice(price);
        })
      if (search) {
        console.log(search);
        const reqData = Object.values(Products).map((product) => {
          if( product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ) {
            return product;
          };
          return null
        });
        setFilteredProducts(
          reqData.filter(val => {
            if (val) return true;
            return false;
          })
        );
      } else setFilteredProducts(Products);
    });

  return (
    <Page title="Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cart
        </Typography>
          <br /><br />
          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <RootStyle>
                <TextField
                  placeholder="Search Product..."
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Box
                            component={Icon}
                            icon={searchFill}
                            sx={{
                              ml: 1,
                              width: 20,
                              height: 20,
                              color: 'text.disabled'
                            }}
                          />
                        </InputAdornment>
                      </>
                    )
                  }}
                />
          </RootStyle>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
      </FormControl>

        </Stack>

        <Grid container spacing={3}>
          {
            filteredProducts.length > 0 ? Object.keys(filteredProducts).map(function(key, index) {
             return <Grid key={filteredProducts[key].id} item xs={12} sm={6} md={3}>
                    <CartCard product={filteredProducts[key]} />
                  </Grid>
            }) : Object.keys(Products).map(function(key, index) {
              return <Grid key={Products[key].id} item xs={12} sm={6} md={3}>
              <CartCard product={Products[key]} />
            </Grid>
            }) 
          }
        </Grid>
        <ProductCartWidget />
        <br /><br /> <br /><br />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
             <Typography variant="h4" sx={{ mb: 5 }}>Total Price : {totalPrice} $</Typography>
          <Button variant="contained" size="large">Proceed to Checkout</Button> 
        </Grid>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartReducer
  }
}

export default connect(mapStateToProps)(Cart);