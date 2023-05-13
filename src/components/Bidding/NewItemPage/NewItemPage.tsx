import { FC, forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid, Snackbar, Stack } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createItem } from '../../../services/ItemService';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewItemPage: FC = () => {
  const [name, setName] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleStartPriceChange = (value: string) => {
    setStartPrice(value);
  };

  const handleTimeWindowChange = (value: string) => {
    setTimeWindow(value);
  };

  const isEnabled =
    (name.length > 0 && startPrice.length > 0 && timeWindow.length > 0) ||
    false;

  const handleResetClick = () => {
    setName('');
    setStartPrice('');
    setTimeWindow('');
  };

  const handleCreateItemClick = async () => {
    const newItemRequestBody = {
      name: name,
      startingPrice: Number(startPrice),
      duration: Number(timeWindow),
    };
    const createItemResponse = await createItem(newItemRequestBody);
    if (createItemResponse) {
      setShouldShowAlert(true);
      setIsSuccessResponse(createItemResponse.success);
      setResponseMessage(createItemResponse.message);
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
      autoHideDuration={5000}
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
                id="itemName"
                label="Item Name"
                inputMode="text"
                value={name}
                onChange={e => handleNameChange(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                autoComplete="off"
                id="startPrice"
                label="Starting Price ($)"
                type="number"
                value={startPrice}
                onChange={e => handleStartPriceChange(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                autoComplete="off"
                id="timeWindow"
                label="Time Window (hours)"
                type="number"
                value={timeWindow}
                onChange={e => handleTimeWindowChange(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isEnabled}
                  onClick={handleCreateItemClick}>
                  Create
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

export default NewItemPage;
