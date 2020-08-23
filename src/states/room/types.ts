import { AppError } from '../../@types/error';
import { Room } from '../../@types/room';

export const ROOM_FETCH_REQUESTED = 'ROOM_FETCH_REQUESTED';
export const ROOM_FETCH_SUCCEEDED = 'ROOM_FETCH_SUCCEEDED';
export const ROOM_FETCH_FAILED = 'ROOM_FETCH_FAILED';

export type RoomAction = {
  type: string;
  payload: string;
};

export type RoomState = {
  loading: boolean;
  error?: AppError;
  payload?: Room[];
};
