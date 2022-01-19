import { Icon } from '@iconify/react';
import { useRef, useState, useEffect} from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
import heartFilled from '@iconify/icons-ant-design/heart-filled';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';

import { connect } from 'react-redux';
import { getUser } from '../../redux/actions/userActions';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/dashboard'
  },
  {
    label: 'Cart',
    icon: shoppingCartFill,
    linkTo: '/dashboard/cart'
  },
  {
    label: 'Favourites',
    icon: heartFilled,
    linkTo: '/dashboard/favourites'
  }
];

// ----------------------------------------------------------------------
function AccountPopover(props) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    props.getUser();
  })

  const [redirectToLogin,setRedirectToLogin] = useState(false)

    const performRedirectToLogin = () =>{
      if(redirectToLogin){
        return <Navigate to="/login" />
      }
      else return null
    }
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={user ? (user.photoURL ? user.photoURL :  "/static/mock-images/avatars/avatar_default.jpg") : "/static/mock-images/avatars/avatar_default.jpg"} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?((user.firstName + ' ' + user.lastName) ? (user.firstName + ' ' + user.lastName) : "User"): "User"}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user ? (user.email ? user.email : "user@gmail.com") : "user@gmail.com"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={(e)=>{e.preventDefault();localStorage.removeItem("userId");localStorage.removeItem("user");setRedirectToLogin(true)}}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
      {performRedirectToLogin()}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user
  } 
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getUser : () => {dispatch(getUser())},
  } 
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountPopover);
