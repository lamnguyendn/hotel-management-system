import { Room } from '../../../@types/room';

export type RoomListPresenterProps = {
  handleClick: () => void;
  rooms: Room[];
};
