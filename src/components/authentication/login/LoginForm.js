import * as Yup from 'yup';
import React ,{ useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import {Signin} from '../../../APIcalls/Auth';
import Snackbar from '@mui/material/Snackbar';


import { connect } from 'react-redux';
import {postUser} from '../../../redux/actions/userActions';

import MuiAlert from '@mui/material/Alert';
// ----------------------------------------------------------------------

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack ,setOpenSnack] = useState(false);
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;
  const [snackMsg, setSnackMsg] = useState("");
  const [severity,setSeverity] = useState("");
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleClose = () => {
    setOpenSnack(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const user = {
        "email" : values.email,
        "password" : values.password
      }
      console.log(user);
      Signin(user)
      .then(res=>{
        console.log(res);
        if(res.status === 200){
          props.postUser(res.user);
          localStorage.setItem("userId", res.user.id);
          console.log(res.user)
          const curruser = {
            "firstName": res.user.firstName,
            "lastName": res.user.lastName,
            "email": res.user.email,
            "photoURL": res.user.photoURL,
          }
          localStorage.setItem("user", JSON.stringify(curruser));
          setSnackMsg(res.msg);setSeverity("success");
          navigate('/dashboard/app', { replace: true });
        }
        else{
          switch(res.status){
            case 401 : {setSnackMsg(res.msg);setSeverity("error")};break;
            case 500 : {setSnackMsg(res.msg);setSeverity("error")};break;
            default : console.log(res);
          }
          setOpenSnack(true);
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  });


  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleClose}
          autoHideDuration={4000}
          key={vertical + horizontal}
        >
           <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {snackMsg}
            </Alert>
        </Snackbar>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Login
        </LoadingButton>
        
      </Form>
    </FormikProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user
  } 
}

const mapDispatchToProps = (dispatch)=>{
  return {
    postUser : (user)=>{dispatch(postUser(user))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);