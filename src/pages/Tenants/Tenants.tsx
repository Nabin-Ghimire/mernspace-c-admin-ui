import { useState } from 'react'
import { userAuthStore } from '../../store'
import { Link, Navigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTenant, getTenants } from '../../http/api';
import { Breadcrumb, Button, Drawer, Form, Space, Table } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import TenantForm from './forms/TenantForm';
import TenantFilter from './TenantFilter';
import { CreateTenantData } from '../../types';
import { PER_PAGE } from '../../constants';

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

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [opentenantDrawer, setOpentenantDrawer] = useState(false);
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  })

  const { user }
    = userAuthStore();
  if (user?.role !== 'admin') {
    <Navigate to='/' replace={true} />
  }

  const onHandleSubmit = async () => {
    await form.validateFields();
    await tenantMutate(form.getFieldsValue());
    form.resetFields();
    setOpentenantDrawer(false);


  }

  const { mutate: tenantMutate } = useMutation({
    mutationKey: ['tenant'],
    mutationFn: async (data: CreateTenantData) => createTenant(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    }

  })

  const { data: tenants, isLoading, isError, error } = useQuery({
    queryKey: ['tenants', queryParams],
    queryFn: () => {
      const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString();
      return getTenants(queryString).then((res) => res.data);

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

      <Table columns={columns} dataSource={tenants?.data} rowKey={"id"}
        pagination={
          {
            total: tenants?.total,
            current: queryParams?.currentPage,
            pageSize: queryParams.perPage,
            onChange: (page) =>
              setQueryParams((prev) => {
                return {
                  ...prev,
                  currentPage: page
                }
              })
          }
        } />

      <Drawer title="Create Tenant" open={opentenantDrawer} onClose={() => setOpentenantDrawer(false)} width={720} destroyOnClose={true} extra={
        <Space>
          <Button onClick={() => { setOpentenantDrawer(false) }}>Cancel</Button>
          <Button type='primary' onClick={onHandleSubmit}>Submit</Button>
        </Space>
      }>
        <Form layout='vertical' form={form} >
          <TenantForm />
        </Form>
      </Drawer>

    </Space>
  </>
}

export default Tenants
