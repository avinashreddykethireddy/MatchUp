import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Icon } from '@iconify/react';
import { Card, Link, Typography, Stack } from '@material-ui/core';
import buyIcon from '@iconify/icons-icons8/buy';
import { styled } from '@material-ui/core/styles';
import { Button , Box } from '@material-ui/core';

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  });

export default function DashboardCard({product,...props}){
    const { name, cover, id, price} = product;
    console.log(product);
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
         </Stack>
       </Stack>
     
     </Stack>
   </Card>
    )
}