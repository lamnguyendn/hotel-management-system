import get from 'lodash/get';
import { createSelector } from 'reselect';
import { GlobalState } from '../types';

export const roomsSelector = createSelector(
  (state: GlobalState) => state.rooms,
  (rooms) => get(rooms, 'data')
);

export const roomsSelector2 = createSelector(
  (state: GlobalState) => state.rooms,
  (rooms) => rooms
);
