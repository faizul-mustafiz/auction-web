import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Feature } from '../../enums/feature.enum';

export const reducerName = 'feature';
export const SET_FEATURE = 'auction/reducer/items/SET_FEATURE';

export interface SetFeatureAction extends AnyAction {
  feature: string;
  type: typeof SET_FEATURE;
}
export type ListTableActionTypes = SetFeatureAction;

export const SetFeature = (feature: string): SetFeatureAction => ({
  feature,
  type: SET_FEATURE,
});

export interface FeatureState {
  feature: string;
}

const initialState: ImmutableListTableState = SeamlessImmutable({
  feature: Feature.items,
});

export type ImmutableListTableState =
  SeamlessImmutable.ImmutableObject<FeatureState>;

export default function reducer(
  state: ImmutableListTableState = initialState,
  action: ListTableActionTypes,
): ImmutableListTableState {
  switch (action.type) {
    case SET_FEATURE:
      return SeamlessImmutable({
        ...state.asMutable({ deep: true }),
        feature: action.feature,
      });
    default:
      return state;
  }
}

export function getFeature(state: Partial<Store>): string {
  return (state as any)[reducerName].feature;
}
