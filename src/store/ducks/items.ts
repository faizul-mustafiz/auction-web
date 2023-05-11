import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** interface for flexible object */
export interface FlexObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/** The reducer name */
export const reducerName = 'items';

// actions
/** action types */
export const SET_ITEMS = 'auction/reducer/items/SET_ITEMS';

/** interface for SET_COUNTER action */
export interface SetItemsAction extends AnyAction {
  items: any[];
  type: typeof SET_ITEMS;
}

/** Create type for counter reducer actions */
export type ListTableActionTypes = SetItemsAction;
//  | AnyAction;

// action creators

export const setItems = (items: any[]): SetItemsAction => ({
  items,
  type: SET_ITEMS,
});

// the reducer

/** interface for counter state in redux store */
export interface ItemsState {
  items: any[];
}

/** Create an immutable counter state */
export type ImmutableListTableState =
  SeamlessImmutable.ImmutableObject<ItemsState>;

/** initial session state */
const initialState: ImmutableListTableState = SeamlessImmutable({
  items: [],
});

/** the counter reducer function */
export default function reducer(
  state: ImmutableListTableState = initialState,
  action: ListTableActionTypes,
): ImmutableListTableState {
  switch (action.type) {
    case SET_ITEMS:
      return SeamlessImmutable({
        ...state.asMutable({ deep: true }),
        items: action.items,
      });
    default:
      return state;
  }
}

// selectors

/** returns the count
 * @param {Partial<Store>} state - the redux store
 * @return { number } - the existing count
 */
export function getItems(state: Partial<Store>): any[] {
  return (state as any)[reducerName].items;
}
