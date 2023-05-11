import { combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import items, { ItemsState, reducerName as ItemsReducer } from './ducks/items';
import itemStatus, {
  ItemStatusState,
  reducerName as ItemStatusReducer,
} from './ducks/itemStatus';

// reducers
/** Initial reducers in the reducer registry */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultReducers: any = {};

/** Add counter reducer to registry */
defaultReducers[ItemsReducer] = items;
defaultReducers[ItemStatusReducer] = itemStatus;

const rootReducer = combineReducers(defaultReducers);

export type StoreType = Store & ItemsState & ItemStatusState;

/** The initial store */
const store: StoreType = createStore(rootReducer, composeWithDevTools());

export default store;
