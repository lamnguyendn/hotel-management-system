import get from 'lodash/get';
import { createSelector } from 'reselect';

export const roomsSelector = createSelector(
  (state: any) => state.rooms,
  (rooms) => get(rooms, 'data')
);
