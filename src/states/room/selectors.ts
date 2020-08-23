import { createSelector } from 'reselect';
import { GlobalState } from '../types';

export const roomsSelector = createSelector(
  (state: GlobalState) => state.rooms,
  (rooms) => rooms.payload
);
