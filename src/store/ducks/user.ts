import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

export const reducerName = 'user';
export const SET_USER = 'auction/reducer/items/SET_USER';

export interface SetUserAction extends AnyAction {
  user: any;
  type: typeof SET_USER;
}
export type ListTableActionTypes = SetUserAction;

export const setUser = (user: any): SetUserAction => ({
  user,
  type: SET_USER,
});

export interface UserState {
  user: any;
}

const initialState: ImmutableListTableState = SeamlessImmutable({
  user: {
    email: '',
    balance: 0,
  },
});

export type ImmutableListTableState =
  SeamlessImmutable.ImmutableObject<UserState>;

export default function reducer(
  state: ImmutableListTableState = initialState,
  action: ListTableActionTypes,
): ImmutableListTableState {
  switch (action.type) {
    case SET_USER:
      return SeamlessImmutable({
        ...state.asMutable({ deep: true }),
        user: action.user,
      });
    default:
      return state;
  }
}

export function getUser(state: Partial<Store>): any {
  return (state as any)[reducerName].user;
}
