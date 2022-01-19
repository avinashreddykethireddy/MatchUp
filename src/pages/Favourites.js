import React from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@material-ui/core/styles';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Grid, Container, Stack } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// components
import { Box, InputAdornment } from '@material-ui/core';
import Page from '../components/Page';
import { FavouriteWidget , FavouriteBlogPostCard} from '../components/_dashboard/blog';

import {GetFavouriteBlogs} from '../APIcalls/Blog';
// ------------------------------

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

function Blog(props) {
  const [serachValue,setSerachValue] = React.useState('')
  const [AllFavouriteBlogs,setAllFavouriteBlogs] = React.useState([])

  React.useEffect(() => {
    let userId = localStorage.getItem('userId') || 1 ;
    GetFavouriteBlogs(userId)
    .then((res => {
        setAllFavouriteBlogs(res.data.Favourites);
    }))
    if (serachValue) {
      const reqData = AllFavouriteBlogs.map((blog, index) => {
        if( blog.title.toLowerCase().indexOf(serachValue.toLowerCase()) >= 0 ) {
          return blog;
        };
        return null
      });
      setAllFavouriteBlogs(
        reqData.filter(val => {
          if (val) return true;
          return false;
        })
      );
    } else setAllFavouriteBlogs(AllFavouriteBlogs);

  },[serachValue,AllFavouriteBlogs,AllFavouriteBlogs])

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <FavouriteWidget />
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <RootStyle>
                <TextField
                  placeholder="Search Blog..."
                  onChange={(e) => setSerachValue(e.target.value)}
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
            AllFavouriteBlogs.length > 0 ? Object.keys(AllFavouriteBlogs).map(function(key, index) {
              return <FavouriteBlogPostCard id={AllFavouriteBlogs[key].id} cover={AllFavouriteBlogs[key].cover} description={AllFavouriteBlogs[key].description} title={AllFavouriteBlogs[key].title} avatarUrl={AllFavouriteBlogs[key].avatarUrl} key={AllFavouriteBlogs[key].id} index={index} />
            }) : null
          }
        </Grid>
      </Container>
    </Page>
  );
}

export default Blog;