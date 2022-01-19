import {useState,useEffect} from 'react';
import { Icon } from '@iconify/react';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';
import {connect} from 'react-redux';
import {getCartItems,upadteCartItems} from '../../../redux/actions/cartActions';
import {GetCartProducts} from '../../../APIcalls/Products';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

function CartWidget(props) {
  const [cartNumber ,setCartNumber] = useState(0);
  useEffect(() => {
    let userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : 1; 
    GetCartProducts(userId)
    .then((user) => {
     
      props.upadteCartItems(user.CartProducts);
      let number = 0;
      for(let i = 0; i < user.CartProducts.length;i++){
        number += parseInt(user.CartProducts[i].quantity);
      }
      setCartNumber(number);
    })
  
  })
  return (
    <RootStyle>
      <Badge onClick={() =>  window.location.href = "http://localhost:3000/dashboard/cart"} showZero badgeContent={cartNumber} color="error" max={99}>
        <Icon icon={shoppingCartFill} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems : state.cartReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems : () => {dispatch(getCartItems())},
    upadteCartItems : (products) => {dispatch(upadteCartItems(products))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartWidget);