import { FC, forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemStatus } from '../../../store/ducks/itemStatus';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import {
  bidItem,
  deleteItem,
  publishItem,
  searchItem,
} from '../../../services/ItemService';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { setItems } from '../../../store/ducks/items';

export interface ItemProps {
  item: any;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemActionButton: FC<ItemProps> = (props: ItemProps) => {
  const { item } = props;
  const itemStatus = useSelector(getItemStatus);
  const dispatch = useDispatch();
  /**
   * * response success and error response alert related state variables
   */
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');
  /**
   * * bid dialog and bid feature related state variables
   */
  const [shouldShowBidDialog, setShouldShowBidDialog] = useState(false);
  const [bid, setBid] = useState('');
  /**
   * * publish button click event handler
   */
  const handlePublishButtonClick = async () => {
    const publishItemResponse = await publishItem(item._id);
    if (publishItemResponse) {
      setShouldShowAlert(true);
      setIsSuccessResponse(publishItemResponse.success);
      setResponseMessage(publishItemResponse.message);
      const searchItemResponse = await searchItem(itemStatus);
      if (searchItemResponse) {
        dispatch(setItems(searchItemResponse.result.items));
      }
    }
  };
  /**
   * * bid item button click event handler
   */
  const handleBidButtonClick = async () => {
    const bidItemPayload = {
      id: item._id,
      bid: Number(bid),
    };
    const bidItemResponse = await bidItem(bidItemPayload);
    if (bidItemResponse) {
      setShouldShowAlert(true);
      setIsSuccessResponse(bidItemResponse.success);
      setResponseMessage(bidItemResponse.message);
      if (bidItemResponse.success) {
        handleBidDialogClose();
      }
      const searchItemResponse = await searchItem(itemStatus);
      if (searchItemResponse) {
        dispatch(setItems(searchItemResponse.result.items));
      }
    }
  };
  /**
   * * delete button click event handler
   */
  const handleDeleteButtonClick = async () => {
    const deleteItemResponse = await deleteItem(item._id);
    if (deleteItemResponse) {
      setShouldShowAlert(true);
      setIsSuccessResponse(deleteItemResponse.success);
      setResponseMessage(deleteItemResponse.message);
      const searchItemResponse = await searchItem(itemStatus);
      if (searchItemResponse) {
        dispatch(setItems(searchItemResponse.result.items));
      }
    }
  };
  /**
   * * bid dialog open button click handler
   */
  const handleBidDialogOpen = () => {
    setShouldShowBidDialog(true);
  };
  const handleBidDialogClose = () => {
    setShouldShowBidDialog(false);
    setBid('');
  };
  const handleBidChange = (value: string) => {
    setBid(value);
  };

  const isEnabled = bid.length > 0;
  /**
   * * response success and error response alert related methods
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

  const BidDialog = (
    <Dialog fullWidth open={shouldShowBidDialog} onClose={handleBidDialogClose}>
      <DialogTitle sx={{ fontSize: 32 }}>{item.name}</DialogTitle>
      <DialogContent>
        Bidding amount should be greater then <b>Current Height Bid</b> and{' '}
        <b>Starting Price</b>. If <b>Current Height Bid</b> is <b>0</b> then no
        one has placed Bid on this item
        <DialogContentText sx={{ paddingBottom: 4, paddingTop: 3 }}>
          Current Height Bid: <b>{item.currentHighestBid}$</b> | Starting Price:{' '}
          <b>{item.startingPrice}$</b>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="bid"
          label="Bid Price ($)"
          type="number"
          fullWidth
          variant="standard"
          value={bid}
          onChange={e => handleBidChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBidDialogClose}>Cancel</Button>
        <Button
          disabled={!isEnabled}
          onClick={handleBidButtonClick}
          variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  switch (itemStatus) {
    case ItemStatus.draft:
      return (
        <div>
          <Button
            variant="outlined"
            color="success"
            onClick={handlePublishButtonClick}>
            Publish
          </Button>
          {AlertSnackBar}
        </div>
      );
    case ItemStatus.ongoing:
      return (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBidDialogOpen}>
            Bid
          </Button>
          {AlertSnackBar}
          {BidDialog}
        </div>
      );
    case ItemStatus.completed:
      return (
        <div>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteButtonClick}>
            Delete
          </Button>
          {AlertSnackBar}
        </div>
      );
    default:
      return <CircularProgress />;
  }
};
export default ItemActionButton;
