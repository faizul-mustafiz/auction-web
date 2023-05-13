import { FC, forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Snackbar, Stack } from '@mui/material';
import RequestInterceptor from '../../../services/RequestInterceptor';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DepositPage: FC = () => {
  const [amount, setAmount] = useState('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const handleAmountChange = (value: string) => {
    setAmount(value);
  };
  const isEnabled = amount.length > 0 || false;
  const handleResetClick = () => {
    setAmount('');
  };
  const handleDepositClick = () => {
    const depositRequestBody = {
      amount: Number(amount),
    };
    RequestInterceptor.post('/users/deposit', depositRequestBody).then(
      (response: any) => {
        console.log('response', response);
        if (response && response.data.success) {
          setIsErrorResponse(false);
        } else {
          setIsErrorResponse(true);
        }
        setShouldShowAlert(true);
        setResponseMessage(response.data.message);
        handleResetClick();
      },
    );
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
    setIsErrorResponse(false);
    setShouldShowAlert(false);
  };
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
      <Snackbar
        open={shouldShowAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleResponseMessageClose}>
        <Alert
          onClose={handleResponseMessageClose}
          severity={isErrorResponse ? 'error' : 'success'}
          sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DepositPage;
