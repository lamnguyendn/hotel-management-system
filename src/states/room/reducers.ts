import { Room } from '../../@types/room';
import ApiError from '../../apis/apiError';
import { ROOM_FETCH_FAILED, ROOM_FETCH_SUCCEEDED } from './types';

type RoomState = {
  data: Room[] | undefined;
  error: ApiError | null;
  loading: boolean;
  success: boolean;
};

export const roomReducers = (
  state = { data: undefined, error: null, loading: false, success: false },
  action: { data?: Room[]; type: string; error: ApiError }
): RoomState => {
  const { type, data, error } = action;
  switch (type) {
    case ROOM_FETCH_SUCCEEDED:
      return { data, error: null, loading: false, success: true };
    case ROOM_FETCH_FAILED:
      return { data: undefined, error, loading: false, success: false };
    default:
      return state;
  }
};
