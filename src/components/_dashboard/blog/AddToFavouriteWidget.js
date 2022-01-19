import {useState,useEffect} from 'react';
import { Icon } from '@iconify/react';
import heartFilled from '@iconify/icons-ant-design/heart-filled';
// material
import { styled } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';
import {connect} from 'react-redux';
import {getCartItems,upadteCartItems} from '../../../redux/actions/cartActions';
import {GetFavouriteBlogs} from '../../../APIcalls/Blog';
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

function FavouriteWidget(props) {
  const [cartNumber ,setCartNumber] = useState(0);
  useEffect(() => {
    let userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : 1; 
    GetFavouriteBlogs(userId)
    .then((res) => {
      setCartNumber(res.data.Favourites.length);
    })
  
  })
  return (
    <RootStyle>
      <Badge onClick={() =>  window.location.href = "http://localhost:3000/dashboard/favourites"} showZero badgeContent={cartNumber} color="error" max={99}>
        <Icon icon={heartFilled} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}

export default FavouriteWidget;