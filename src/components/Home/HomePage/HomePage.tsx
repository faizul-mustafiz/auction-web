import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../../services/UserService';
import { getUserId } from '../../../utility/auth.utility';
import Home from '../Home/Home';
import { MenuBar } from '../MenuBar';
import './HomePage.css';
import { setUser } from '../../../store/ducks/user';

export default function HomePage() {
  const dispatch = useDispatch();
  getUserInfo(getUserId()).then((response: any) => {
    if (response) {
      dispatch(setUser(response.result));
    }
  });

  return (
    <div>
      <MenuBar />
      <div className="container">
        <Home />
      </div>
    </div>
  );
}
