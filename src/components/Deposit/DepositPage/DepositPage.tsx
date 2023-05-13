import { FC, forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Snackbar, Stack } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { deposit } from '../../../services/UserService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/ducks/user';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DepositPage: FC = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const isEnabled = amount.length > 0 || false;

  const handleResetClick = () => {
    setAmount('');
  };

  const handleDepositClick = async () => {
    const depositRequestBody = {
      amount: Number(amount),
    };
    const depositResponse = await deposit(depositRequestBody);
    if (depositResponse) {
      setShouldShowAlert(true);
      setIsSuccessResponse(depositResponse.success);
      setResponseMessage(depositResponse.message);
      dispatch(
        setUser({
          email: depositResponse.result.email,
          balance: depositResponse.result.balance || 0,
        }),
      );
      handleResetClick();
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

  const AlertSnackBar = (
    <Snackbar
      open={shouldShowAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      onClose={handleResponseMessageClose}>
      <Alert
        onClose={handleResponseMessageClose}
        severity={isSuccessResponse ? 'success' : 'error'}
        sx={{ width: '100%' }}>
        {responseMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <div className="container">
      <Card variant="outlined">
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                required
                autoComplete="off"
                id="amount"
                label="Amount ($)"
                inputMode="text"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isEnabled}
                  onClick={handleDepositClick}>
                  Deposit
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleResetClick}>
                  Reset
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {AlertSnackBar}
    </div>
  );
};

export default DepositPage;
