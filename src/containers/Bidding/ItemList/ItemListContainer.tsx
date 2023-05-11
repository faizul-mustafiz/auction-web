import { FC } from 'react';
import { ItemList } from '../../../components/Bidding/ItemList';
import { useSelector } from 'react-redux';
import { getItems } from '../../../store/ducks/items';

const ItemListContainer: FC = () => {
  const items = useSelector(getItems);
  return <ItemList items={items} />;
};

export default ItemListContainer;
