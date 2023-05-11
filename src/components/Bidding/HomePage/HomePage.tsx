import ItemsPage from '../ItemsPage/ItemsPage';
import { MenuBar } from '../MenuBar';
import { Button, Stack } from '@mui/material';
import './Home.css';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetItemStatus, getItemStatus } from '../../../store/ducks/itemStatus';

export default function HomePage() {
  const itemStatus = useSelector(getItemStatus);
  const dispatch = useDispatch();
  const handleOngoingClick = () => {
    dispatch(SetItemStatus(ItemStatus.ongoing));
  };
  const handleCompleteClick = () => {
    dispatch(SetItemStatus(ItemStatus.completed));
  };
  return (
    <div>
      <MenuBar />
      <div className="container">
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
        <div className="item-list">
          <ItemsPage key={itemStatus} />
        </div>
      </div>
    </div>
  );
}
