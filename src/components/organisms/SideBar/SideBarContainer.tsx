import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SideBarPresenter } from './SideBarPresenter';

export const SideBarContainer = (): JSX.Element => {
  const history = useHistory();

  const handleRoomClick = useCallback(() => {
    history.push('/list');
  }, [history]);

  const handleVideosClick = useCallback(() => {
    history.push('/videos');
  }, [history]);

  const handleFileClick = useCallback(() => {
    history.push('/files');
  }, [history]);

  return (
    <SideBarPresenter
      handleRoomClick={handleRoomClick}
      handleVideosClick={handleVideosClick}
      handleFileClick={handleFileClick}
    />
  );
};
