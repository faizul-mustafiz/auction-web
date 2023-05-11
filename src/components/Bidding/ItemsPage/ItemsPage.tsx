import { useEffect } from 'react';
import ItemListContainer from '../../../containers/Bidding/ItemList/ItemListContainer';
import RequestInterceptor from '../../../services/RequestInterceptor';
import { useDispatch } from 'react-redux';
import { setItems } from '../../../store/ducks/items';

export default function ItemsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('this is a basic items get page');
    RequestInterceptor.get('/items').then((response: any) => {
      console.log('items-get-response', response);
      if (response) {
        dispatch(setItems(response.data.result));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ItemListContainer />;
}
