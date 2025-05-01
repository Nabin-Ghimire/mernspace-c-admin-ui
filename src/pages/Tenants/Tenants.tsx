import React, { useState } from 'react'
import { userAuthStore } from '../../store'
import { Link, Navigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTenant, getTenants } from '../../http/api';
import { Breadcrumb, Button, Drawer, Form, Space, Table } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import TenantForm from './forms/TenantForm';
import TenantFilter from './TenantFilter';
import { CreateTenantData, FieldData } from '../../types';
import { PER_PAGE } from '../../constants';
import { debounce } from 'lodash';

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
  const [tenantFilter] = Form.useForm();
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

  const debouncedQUpdate = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500)
  }, [])


  const onTenantFilterChange = (changedFields: FieldData[]) => {

    const chnagedFilterFields = changedFields.map((item) => ({ [item.name[0]]: item.value })).reduce((acc, item) => ({ ...acc, ...item }), {});

    debouncedQUpdate(chnagedFilterFields.q);

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
      const filteredParams = Object.fromEntries(Object.entries(queryParams).filter((item) => !!item[1]));
      const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString();
      console.log(queryString)
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

      <Form form={tenantFilter} onFieldsChange={onTenantFilterChange}>
        <TenantFilter>
          <Button type='primary' onClick={() => setOpentenantDrawer(true)} icon={<PlusOutlined />}
          >Add Tenant</Button>
        </TenantFilter>
      </Form>

      <Table columns={columns} dataSource={tenants?.data} rowKey={"id"}
        pagination={
          {
            total: tenants?.total,
            current: queryParams?.currentPage,
            pageSize: queryParams.perPage,
            onChange: (page) => {
              setQueryParams((prev) => {
                return {
                  ...prev,
                  currentPage: page
                }
              })
            },
            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]} - ${range[1]} of ${total} items`;//range is an array of two numbers, the first number is the first item of the current page and the second number is the last item of the current page.
            }

          }} />

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
