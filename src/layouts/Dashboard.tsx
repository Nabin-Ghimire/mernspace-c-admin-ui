import { Navigate, NavLink, Outlet } from "react-router-dom"
import Icon, { BellFilled, GiftOutlined, HomeOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons'
import { userAuthStore } from "../store"
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from "antd";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import { ResturantIcon } from "../components/icons/Restaurants";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";

const { Header, Content, Footer, Sider } = Layout;

const getMenuItem = (role: string) => {
  const baseItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <NavLink to="/">Home</NavLink>,
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

  if (role === 'admin') {

    const menuItems = [...baseItems]
    menuItems.splice(1, 0, {
      key: '/users',
      icon: <UserOutlined />,
      label: <NavLink to="/users">Users</NavLink>,
    },)
    menuItems.splice(2, 0, {
      key: '/restaurants',
      icon: <Icon component={ResturantIcon} />,
      label: <NavLink to="/tenants">Restaurants</NavLink>,
    },)

    return menuItems;
  }
  return baseItems;

}
const Dashboard = () => {

  const { logout: logoutFromStore } = userAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
      return;
    }
  })

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = userAuthStore();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />
  }
  const items = getMenuItem(user.role);

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
          <Header style={{ paddingLeft: '16px', paddingRight: '16px', background: colorBgContainer }}>

            <Flex gap="middle" align="start" justify="space-between">
              <Badge text={user.role === 'admin' ? 'Admin' : user.tenant?.name} status="success" />
              <Space size={16}>
                <Badge dot>
                  <BellFilled />
                </Badge>
                <Dropdown menu={{
                  items: [
                    {
                      key: 'logout',
                      label: 'logout',
                      onClick: () => logoutMutate()
                    }
                  ]
                }} placement="bottomRight">
                  <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                </Dropdown>
              </Space>
            </Flex>

          </Header>
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