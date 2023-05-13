import Home from '../Home/Home';
import { MenuBar } from '../MenuBar';
import './HomePage.css';

export default function HomePage() {
  return (
    <div>
      <MenuBar />
      <div className="container">
        <Home />
      </div>
    </div>
  );
}
