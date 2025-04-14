import { Navigate, NavLink, Outlet } from "react-router-dom"
import Icon, { GiftOutlined, HomeOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons'
import { userAuthStore } from "../store"
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import { ResturantIcon } from "../components/icons/Restaurants";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: '/restaurants',
    icon: <Icon component={ResturantIcon} />,
    label: <NavLink to="/restaurants">restaurants</NavLink>,
  },
  {
    key: '/products',
    icon: <ProductOutlined />,
    label: <NavLink to="/products">products</NavLink>,
  },
  {
    key: '/promos',
    icon: <GiftOutlined />,
    label: <NavLink to="/promos">promos</NavLink>,
  },

]

const Dashboard = () => {

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = userAuthStore();
  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />
  }
  return (
    <div>

      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo">
            <Logo />
          </div>
          <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <div>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Mernspace Pizza shop ©2025 Created by Mernspace
          </Footer>
        </Layout>
      </Layout>


    </div>
  )
}

export default Dashboard