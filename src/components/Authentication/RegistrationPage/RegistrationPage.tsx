import { FC, forwardRef, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUp, verify } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import {
  isLoggedIn,
  setAccessToken,
  setUserId,
} from '../../../utility/auth.utility';
import { setRefreshToken } from '../../../utility/auth.utility';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/ducks/user';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegistrationPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  });
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const isEnabled = (email.length > 0 && password.length > 0) || false;
  const handleSignInClick = async () => {
    const signUpRequestBody = {
      email: email,
      password: password,
    };
    const signUpResponse = await signUp(signUpRequestBody);
    if (signUpResponse.success) {
      const verifyResponse = await verify(signUpResponse.result);
      if (verifyResponse.success) {
        setAccessToken(verifyResponse.result.accessToken);
        setRefreshToken(verifyResponse.result.refreshToken);
        setUserId(verifyResponse.result._id);
        dispatch(
          setUser({
            email: verifyResponse.result.email,
            balance: verifyResponse.result.balance || 0,
          }),
        );
        navigate('/');
      } else {
        setShouldShowAlert(true);
        setResponseMessage(signUpResponse.message);
      }
    } else {
      setShouldShowAlert(true);
      setResponseMessage(signUpResponse.message);
    }
  };
  /**
   * * Response success and error response alert related methods
   */
  const handleResponseMessageClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setShouldShowAlert(false);
  };
  return (
    <div className="container">
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  paddingBottom: 5,
                }}>
                Registration
              </Typography>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <TextField
                    fullWidth
                    required
                    autoComplete="off"
                    type="email"
                    id="username"
                    label="Email"
                    inputMode="email"
                    onChange={e => handleEmailChange(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={e => handlePasswordChange(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isEnabled}
                    onClick={handleSignInClick}>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Snackbar
        open={shouldShowAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleResponseMessageClose}>
        <Alert
          onClose={handleResponseMessageClose}
          severity="error"
          sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegistrationPage;
