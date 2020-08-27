import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { SideBar } from '../components/layouts/SideBar';
import { history } from './../states/store';
import { LIST_PAGE_PATH } from './constants';
import { privatePage } from './routeDefinition';

const { Header, Sider, Content } = Layout;

export const Routes = (): JSX.Element => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);

  const handleToggle = (event: any) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <Router history={history}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SideBar />
        </Sider>
        <Layout>
          <Header
            className="siteLayoutBackground"
            style={{ padding: 0, background: '#001529' }}
          >
            {React.createElement(
              collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: handleToggle,
                style: { color: '#fff' },
              }
            )}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'calc(100vh - 114px)',
              background: '#fff',
            }}
          >
            <Suspense fallback="...loading">
              <Switch>
                {privatePage.map((page, i) => (
                  <Route key={i} path={page.path} component={page.component} />
                ))}
                <Redirect to={LIST_PAGE_PATH} from="/" />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
