import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export const RoomContainer = (): JSX.Element => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content>main content</Content>
        <Sider>right sidebar</Sider>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};