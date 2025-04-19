import { useState } from 'react'
import { userAuthStore } from '../../store'
import { Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTenants } from '../../http/api';
import { Breadcrumb, Button, Drawer, Space, Table } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import TenantFilter from './TenantFilter';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: "Name",
    dataIndex: 'name',
  },
  {
    title: "Address",
    dataIndex: 'address',
  },
]

const Tenants = () => {
  const [opentenantDrawer, setOpentenantDrawer] = useState(false);

  const { user }
    = userAuthStore();
  if (user?.role !== 'admin') {
    <Navigate to='/' replace={true} />
  }

  const { data: tenants, isLoading, isError, error } = useQuery({
    queryKey: ['tenants'],
    queryFn: () => {
      return getTenants().then((res) => res.data);
    }
  })


  return <>
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Breadcrumb separator={<RightOutlined />} items={[
        {
          title: <Link to="/">Dashboard</Link>,
        },
        {
          title: <Link to="/tenants">Restaurants</Link>,

        }
        ,]} />

      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}

      <TenantFilter onFilterChange={(filterName, filterValue) => {
        console.log(filterName, filterValue);
      }}>
        <Button type='primary' onClick={() => setOpentenantDrawer(true)} icon={<PlusOutlined />}
        >Add Tenant</Button>
      </TenantFilter>

      <Table columns={columns} dataSource={tenants} rowKey={"id"} />

      <Drawer title="Create Tenant" open={opentenantDrawer} onClose={() => setOpentenantDrawer(false)} width={720} destroyOnClose={true} extra={
        <Space>
          <Button onClick={() => { setOpentenantDrawer(false) }}>Cancel</Button>
          <Button type='primary'>Submit</Button>
        </Space>
      }>
        <p>Create Tenant Here with the Item properties</p>
        <p>Create Tenant Here with the Item properties</p>
        <p>Create Tenant Here with the Item properties</p>
      </Drawer>

    </Space>
  </>
}

export default Tenants
