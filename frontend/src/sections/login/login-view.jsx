import axios from 'axios';
import Cookies from 'js-cookie';
import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClick = async () => {

    const data = JSON.stringify({
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    });
    
    console.log(data);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/account/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if (response.data.success) {
        Cookies.set('token', response.data.token);
        Cookies.set('email', response.data.email);
        Cookies.set('name', response.data.name);
        router.push('/');
      } else {
        alert(response.data.message);
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" inputRef={emailRef} label="Email address" />

        <TextField
          name="password"
          label="Password"
          inputRef={passwordRef}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >

          <Divider sx={{ my: 3 }}>
          <Typography variant="h4" textAlign="center">Sign in</Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
