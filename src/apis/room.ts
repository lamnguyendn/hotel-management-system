import { Room } from '../@types/room';
import { MANAGED_ROOMS } from './constants';
import { getInstanceAxios } from './httpClient';

export const fetchRoom = (roomId: string): Promise<Room> => {
  return getInstanceAxios().post(MANAGED_ROOMS, roomId);
};
