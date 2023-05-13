import { useEffect } from 'react';
import ItemListContainer from '../../../containers/Bidding/ItemList/ItemListContainer';
import RequestInterceptor from '../../../services/RequestInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../../store/ducks/items';
import { ItemStatus } from '../../../enums/ItemStatus.enum';
import { getItemStatus } from '../../../store/ducks/itemStatus';

export default function Item() {
  const itemStatus = useSelector(getItemStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (itemStatus === ItemStatus.draft) {
      RequestInterceptor.get(`/items/search?status=${ItemStatus.draft}`).then(
        (response: any) => {
          if (response) {
            dispatch(setItems(response.data.result.items));
          }
        },
      );
    } else if (itemStatus === ItemStatus.ongoing) {
      RequestInterceptor.get(`/items/search?status=${ItemStatus.ongoing}`).then(
        (response: any) => {
          if (response) {
            dispatch(setItems(response.data.result.items));
            return response.data.result;
          }
        },
      );
    } else if (itemStatus === ItemStatus.completed) {
      RequestInterceptor.get(
        `/items/search?status=${ItemStatus.completed}`,
      ).then((response: any) => {
        if (response) {
          dispatch(setItems(response.data.result.items));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <ItemListContainer />;
}
