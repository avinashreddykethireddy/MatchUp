import React, {useState} from 'react';
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
import {addItem} from '../../../redux/actions/dashboard';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const { name, cover, id, price} = product;

  const [showProduct,setShowProduct] = useState(false);
  const [quantity,setQuantity] = useState(1);
  const handleClose = () => {
    setShowProduct(false);
  };

  const [openSnack ,setOpenSnack] = useState(false);
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;
  const [snackMsg, setSnackMsg] = useState("");
  const [severity,setSeverity] = useState("");
  
  const handleAlertClose = () => {
    setOpenSnack(false);
  };


  const AddToCart = (event,productId,quantity) => {
    event.preventDefault();
    let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 1;
    AddProductToCart(productId, quantity,userId)
    .then((res) => {
      if(res){
        console.log(res);
        props.upadteCartItems(res.data);
        switch(res.status) {
          case 200 : {setSnackMsg("Successfully added to cart");setSeverity("success");};break;
          case 401 : {setSnackMsg("Error adding to cart");setSeverity("warning")};break;
          case 500 : {setSnackMsg("Internal Server Error");setSeverity("error")};break;
          default : {setSnackMsg("Internal Server Error");setSeverity("error")};break;
        }
        setOpenSnack(true);
      }
    })
  }

  return (
    <Card>
       <Dialog open={showProduct} maxWidth="xs" fullWidth={true}>
       <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleAlertClose}
          autoHideDuration={4000}
          key={vertical + horizontal}
        >
           <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
              {snackMsg}
            </Alert>
        </Snackbar>
       <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
              {price} $
            </Typography>
          </Typography>
          <Stack alignItems="center">
          <TextField 
              type="number"
              variant="outlined"
              width="md"
              onChange={(e) => setQuantity(e.target.value)}
              InputProps={{
                  inputProps: { 
                      max: "50",
                      min: "1" ,
                      step: "1"
                  }
              }}
              className={InputNumStyle}
              value={quantity}
              label="Quantity"
          />
          </Stack>
          <Stack alignItems="right" justifyContent="space-between">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            startIcon={<Icon icon={buyIcon} />}
            onClick={(e) => AddToCart(e,id,quantity)}
          >
            Add to Cart
          </Button>
          </Stack>
        </Stack>
          <Button color="error" onClick={handleClose}>Close</Button>
      </Stack>
       
      </Dialog>
    
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
              }}
            >
              {price} $
            </Typography>
          </Typography>
          <Stack alignItems="right" justifyContent="space-between">
          <Button
            type="button"
            variant="outlined"
            startIcon={<Icon icon={buyIcon} />}
            onClick={() => {console.log(product);props.addItem(product);setShowProduct(true);}}
          >
            Buy
          </Button>
          </Stack>
        </Stack>
      
      </Stack>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems : state.cartReducer,
    dashboardProducts : state.dashboardReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upadteCartItems : (products) => {dispatch(upadteCartItems(products))},
    addItem : (product) => {dispatch(addItem(product))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopProductCard);