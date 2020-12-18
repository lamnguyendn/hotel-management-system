import { getApiClient } from './request';
import { Room } from '../@types/room';
import { MANAGED_ROOMS } from './constants';

export const fetchRoom = (roomId: string): Promise<Room> => {
  return getApiClient().post(MANAGED_ROOMS, roomId);
};
