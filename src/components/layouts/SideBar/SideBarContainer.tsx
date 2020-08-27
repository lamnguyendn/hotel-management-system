import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const SideBarContainer = (): JSX.Element => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push('/list');
  };

  const handleVideosClick = () => {
    history.push('/videos');
  };

  const handleFileClick = () => {
    history.push('/files');
  };

  return (
    <div>
      <div
        style={{
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px',
        }}
      ></div>
      <Menu theme="dark">
        <Menu.Item key="1" onClick={handleUserClick}>
          <UserOutlined />
          <span> Users</span>
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
