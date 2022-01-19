import {useEffect} from 'react';
// material
import { Box, Grid ,Stack ,Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {connect} from "react-redux";
import {getItems} from "../redux/actions/dashboard";
import {DashboardCard, DashboardComponent} from "../components/_dashboard/products";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { makeStyles } from '@mui/styles';
// ----------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex'
   }
}));

function DashboardApp({ product ,...props }) {
  useEffect(() => {
    props.getItems();
    console.log(props.dashboardProducts);
  })
  const classes = useStyles();
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <br /><br />
          
          <Typography variant="subtitle1" className={classes.wrapIcon}><AccessTimeFilledIcon style={{fill: "green"}}  className={classes.linkIcon}  fontSize="medium"/>&nbsp;&nbsp; Recent Products Viewed</Typography>
        
        </Box>
  
        <Grid container spacing={3}>
        {props.dashboardProducts.length > 0 ?
        Object.keys(props.dashboardProducts).map(function(key, index) { 
              return <Grid key={props.dashboardProducts[key].id} item xs={12} sm={6} md={3}>
                  <DashboardCard product={props.dashboardProducts[key]} />
                  </Grid>
           } ) 
           :  <DashboardComponent /> 
          }
        </Grid>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboardProducts : state.dashboardReducer.dashboardProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItems : () => dispatch(getItems()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardApp);