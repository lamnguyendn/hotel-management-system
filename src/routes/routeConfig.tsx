import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { SideBar } from '../components/organisms/SideBar';
import { history } from '../states/store';
import { LIST_PAGE_PATH } from './constants';
import { privatePage } from './routeDefinition';

const { Header, Sider, Content } = Layout;

export const Routes = (): JSX.Element => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  }, []);

  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    if (collapse) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  };

  return (
    <Router history={history}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SideBar />
        </Sider>
        <Layout>
          <Header className="siteLayoutBackground" style={{ padding: 0, background: '#001529' }}>
            {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: handleToggle,
              style: { color: '#fff' },
            })}
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
                {privatePage.map((page) => (
                  <Route key={page.path} path={page.path} component={page.component} />
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
