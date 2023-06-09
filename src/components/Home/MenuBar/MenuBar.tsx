import { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { getItemStatus, setItemStatus } from '../../../store/ducks/itemStatus';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { setFeature, getFeature } from '../../../store/ducks/feature';
import { Feature } from '../../../enums/feature.enum';
import { signOut } from '../../../services/AuthService';
import { clearStorageData } from '../../../utility/auth.utility';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../../../store/ducks/user';
import { setItems } from '../../../store/ducks/items';

const MenuBar: FC = () => {
  const dispatch = useDispatch();
  const feature = useSelector(getFeature);
  const itemStatus = useSelector(getItemStatus);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  let headerTag = '';
  switch (feature) {
    case Feature.items:
      if (itemStatus === ItemStatus.draft) {
        headerTag = 'Items';
      } else if (itemStatus === ItemStatus.ongoing) {
        headerTag = 'Ongoing Items';
      } else if (itemStatus === ItemStatus.completed) {
        headerTag = 'Completed Items';
      }
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
    dispatch(setFeature(Feature.items));
    dispatch(setItemStatus(ItemStatus.draft));
  };

  const handleCreateNewItemMenuBarButtonClick = () => {
    dispatch(setFeature(Feature.newItem));
    handleClose();
  };

  const handleDepositMenuBarButtonClick = () => {
    dispatch(setFeature(Feature.deposit));
    handleClose();
  };

  const handleLogoutButtonClick = async () => {
    const signOutResponse = await signOut();
    if (signOutResponse.success) {
      clearStorageData();
      clearReduxData();
      navigate('/login');
    }
    handleClose();
  };
  const clearReduxData = () => {
    dispatch(setFeature(Feature.items));
    dispatch(setItemStatus(ItemStatus.draft));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
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
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            {headerTag}
          </Typography>
          {
            <div>
              <Typography variant="h6" component="span" sx={{ marginRight: 1 }}>
                username: {user.email}
              </Typography>
              <Typography variant="h6" component="span" sx={{ marginRight: 2 }}>
                balance: {user.balance || 0}$
              </Typography>
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
