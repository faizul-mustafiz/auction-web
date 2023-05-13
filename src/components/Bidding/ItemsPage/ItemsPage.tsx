import { useDispatch, useSelector } from 'react-redux';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { setItemStatus, getItemStatus } from '../../../store/ducks/itemStatus';
import { Button, Stack } from '@mui/material';
import Items from '../Items/Items';
import './ItemPage.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ItemsPage() {
  const itemStatus = useSelector(getItemStatus);
  const dispatch = useDispatch();
  const handleOngoingClick = () => {
    dispatch(setItemStatus(ItemStatus.ongoing));
  };
  const handleCompleteClick = () => {
    dispatch(setItemStatus(ItemStatus.completed));
  };
  return (
    <div>
      <div>
        <Stack spacing={2} direction="row">
          <Button
            variant={
              itemStatus === ItemStatus.ongoing ? 'contained' : 'outlined'
            }
            onClick={handleOngoingClick}>
            Ongoing
          </Button>
          <Button
            variant={
              itemStatus === ItemStatus.completed ? 'contained' : 'outlined'
            }
            onClick={handleCompleteClick}>
            Completed
          </Button>
        </Stack>
      </div>
      <div className="item-list-padding">
        <Card variant="outlined">
          <CardContent>
            <Items key={itemStatus} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
