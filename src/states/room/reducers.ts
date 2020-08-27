import { AppError } from '../../@types/error';
import { ROOM_FETCH_FAILED, ROOM_FETCH_SUCCEEDED } from './types';

export const roomReducers = (
  state = { data: null, error: null, loading: false },
  action: { data?: any; type: string; error: AppError }
): any => {
  const { type, data, error } = action;
  switch (type) {
    case ROOM_FETCH_SUCCEEDED:
      return { data, error: null };
    case ROOM_FETCH_FAILED:
      return { data: null, error };
    default:
      return state;
  }
};
