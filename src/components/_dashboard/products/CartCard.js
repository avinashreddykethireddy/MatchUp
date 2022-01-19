import {useState} from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Icon } from '@iconify/react';
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import buyIcon from '@iconify/icons-icons8/buy';

import { Button , TextField} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import {AddProductToCart} from '../../../APIcalls/Products';
import {connect} from 'react-redux';
import {upadteCartItems} from '../../../redux/actions/cartActions';
import {RemoveFromCart} from '../../../APIcalls/Products'
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

const InputNumStyle = {
  "& input[type=number]::-webkit-inner-spin-button,& input[type=number]::-webkit-outer-spin-button" : {"opacity" : "1"}
}

function ShopProductCard({ product ,...props }) {
  const { name, cover, id, price , quantity} = product;

  const handleRemoveCartItem = (e,id) => {
    e.preventDefault();
    let userId = localStorage.getItem('userId') || 1;
    RemoveFromCart(id,userId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>


        <Stack direction="row" alignItems="right" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
             Quantity :  {quantity}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="right" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
             Total Price :  {price*quantity} $
            </Typography>
          </Typography>
        </Stack>

        <Button type="button" color="error" variant="contained" onClick={(e) => handleRemoveCartItem(e,id)}>Remove from Cart</Button>
      
      </Stack>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems : state.cartReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upadteCartItems : (products) => {dispatch(upadteCartItems(products))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopProductCard);