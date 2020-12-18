import { Menu } from 'antd';
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { SideBarPresenterProps } from './types';

export const SideBarPresenter = ({
  handleRoomClick,
  handleVideosClick,
  handleFileClick,
}: SideBarPresenterProps): JSX.Element => {
  return (
    <div>
      <div
        style={{
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px',
        }}
      />
      <Menu theme="dark">
        <Menu.Item key="1" onClick={handleRoomClick}>
          <UserOutlined />
          <span> Rooms</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={handleVideosClick}>
          <VideoCameraOutlined />
          <span> Videos</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={handleFileClick}>
          <UploadOutlined />
          <span> Files</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};
