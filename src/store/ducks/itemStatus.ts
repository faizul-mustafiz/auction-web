import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { ItemStatus } from '../../enums/ItemStatus.enum';

export const reducerName = 'itemStatus';
export const SET_ITEM_STATUS = 'auction/reducer/items/SET_ITEM_STATUS';

export interface SetItemStatusAction extends AnyAction {
  itemStatus: string;
  type: typeof SET_ITEM_STATUS;
}
export type ListTableActionTypes = SetItemStatusAction;

export const SetItemStatus = (itemStatus: string): SetItemStatusAction => ({
  itemStatus,
  type: SET_ITEM_STATUS,
});

export interface ItemStatusState {
  itemStatus: string;
}

const initialState: ImmutableListTableState = SeamlessImmutable({
  itemStatus: ItemStatus.draft,
});

export type ImmutableListTableState =
  SeamlessImmutable.ImmutableObject<ItemStatusState>;

export default function reducer(
  state: ImmutableListTableState = initialState,
  action: ListTableActionTypes,
): ImmutableListTableState {
  switch (action.type) {
    case SET_ITEM_STATUS:
      return SeamlessImmutable({
        ...state.asMutable({ deep: true }),
        itemStatus: action.itemStatus,
      });
    default:
      return state;
  }
}

export function getItemStatus(state: Partial<Store>): string {
  return (state as any)[reducerName].itemStatus;
}
