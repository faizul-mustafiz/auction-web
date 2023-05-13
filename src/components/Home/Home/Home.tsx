import { useSelector } from 'react-redux';
import ItemsPage from '../../Bidding/ItemsPage';
import { getFeature } from '../../../store/ducks/feature';
import { Feature } from '../../../enums/feature.enum';
import { NewItemPage } from '../../Bidding';
import DepositPage from '../../Deposit/DepositPage/DepositPage';

export default function Home() {
  const feature = useSelector(getFeature);
  switch (feature) {
    case Feature.items:
      return <ItemsPage />;
    case Feature.newItem:
      return <NewItemPage />;
    case Feature.deposit:
      return <DepositPage />;
    default:
      return <ItemsPage />;
  }
}
