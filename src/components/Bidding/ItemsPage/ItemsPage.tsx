import { useDispatch, useSelector } from 'react-redux';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { SetItemStatus, getItemStatus } from '../../../store/ducks/itemStatus';
import { Button, Stack } from '@mui/material';
import Item from '../Item/Item';
import './ItemPage.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ItemsPage() {
  const itemStatus = useSelector(getItemStatus);
  console.log('ItemsPage-itemStatus', itemStatus);
  const dispatch = useDispatch();
  const handleOngoingClick = () => {
    dispatch(SetItemStatus(ItemStatus.ongoing));
  };
  const handleCompleteClick = () => {
    dispatch(SetItemStatus(ItemStatus.completed));
  };
  return (
    <div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleOngoingClick}>
            Ongoing
          </Button>
          <Button variant="outlined" onClick={handleCompleteClick}>
            Completed
          </Button>
        </Stack>
      </div>
      <div className="item-list-padding">
        <Card variant="outlined">
          <CardContent>
            <Item key={itemStatus} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
