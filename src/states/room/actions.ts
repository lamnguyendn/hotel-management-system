import { RoomAction, ROOM_FETCH_REQUESTED } from './types';

export const fetchRoom = (roomId: string): RoomAction => {
  return {
    type: ROOM_FETCH_REQUESTED,
    payload: roomId,
  };
};
