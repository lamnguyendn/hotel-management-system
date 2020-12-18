import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { actions as roomActions, selectors as roomSelector } from '../../../states/room';
import { RoomListPresenter } from './RoomListPresenter';

export const RoomListContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector(roomSelector.roomsSelector) ?? [];

  useEffect(() => {
    dispatch(roomActions.fetchRoom(''));
  }, [dispatch]);

  const handleClick = useCallback(() => {
    history.push('/form');
  }, [history]);

  return <RoomListPresenter handleClick={handleClick} rooms={rooms} />;
};
