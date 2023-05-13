import { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { SetItemStatus } from '../../../store/ducks/itemStatus';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { SetFeature, getFeature } from '../../../store/ducks/feature';
import { Feature } from '../../../enums/feature.enum';

const MenuBar: FC = () => {
  const dispatch = useDispatch();
  const feature = useSelector(getFeature);
  let headerTag = '';
  switch (feature) {
    case Feature.items:
      headerTag = 'Items';
      break;
    case Feature.newItem:
      headerTag = 'Create New Item';
      break;
    case Feature.deposit:
      headerTag = 'Deposit';
      break;
    default:
      headerTag = 'Items';
      break;
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeToolBarButtonClick = () => {
    dispatch(SetFeature(Feature.items));
    dispatch(SetItemStatus(ItemStatus.draft));
  };

  const handleCreateNewItemMenuBarButtonClick = () => {
    dispatch(SetFeature(Feature.newItem));
    handleClose();
  };

  const handleDepositMenuBarButtonClick = () => {
    dispatch(SetFeature(Feature.deposit));
    handleClose();
  };

  const handleLogoutButtonClick = () => {
    console.log('logout-button-click');
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleHomeToolBarButtonClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="mail"
            sx={{ mr: 2 }}>
            <MailIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {headerTag}
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-bar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-bar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleCreateNewItemMenuBarButtonClick}>
                  Create New Item
                </MenuItem>
                <MenuItem onClick={handleDepositMenuBarButtonClick}>
                  Deposit
                </MenuItem>
                <MenuItem onClick={handleLogoutButtonClick}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
