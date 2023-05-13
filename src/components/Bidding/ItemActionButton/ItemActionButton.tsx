import { FC, forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemStatus } from '../../../store/ducks/itemStatus';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { Button, Snackbar } from '@mui/material';
import {
  deleteItem,
  publishItem,
  searchItem,
} from '../../../services/ItemService';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
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
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');

  const handlePublishButtonClick = async () => {
    console.log('handlePublishButtonClick', item);
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
  const handleBidButtonClick = () => {
    console.log('handleBidButtonClick', item);
  };
  const handleDeleteButtonClick = async () => {
    console.log('handleDeleteButtonClick', item);
    const deleteItemResponse = await deleteItem(item._id);
    console.log('deleteItemResponse', deleteItemResponse);
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
    case ItemStatus.ongoing:
      return (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBidButtonClick}>
            Bid
          </Button>
          {AlertSnackBar}
        </div>
      );
    default:
      return (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBidButtonClick}>
            Bid
          </Button>
          {AlertSnackBar}
        </div>
      );
  }
};
export default ItemActionButton;
