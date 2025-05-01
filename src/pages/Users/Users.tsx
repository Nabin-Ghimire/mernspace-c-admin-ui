import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme, Typography } from "antd"
import { Link, Navigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../../http/api";
import { CreateUserData, FieldData, User } from "../../types";
import { userAuthStore } from "../../store";
import UserFilter from "./UserFilter";
import React, { useState } from "react";
import UserForm from "./forms/UserForm";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',

  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_text: string, record: User) => {
      return (
        <div>{record.firstName}  {record.lastName}</div>
      )
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: "Restaurant",
    dataIndex: "tenant",
    key: "tenant",
    render: (_text: string, record: User) => {
      return (
        <div>{record.tenant?.name}</div>
      )
    },
  },

]

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  })



  const onHandleSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue()); //form.getFieldsValue() gives all entered form values
    form.resetFields();
    setDrawerOpen(false);

  }
  const debouncedQUpdate = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value }))
    }, 500)
  }, [])

  // parsing the search query params to {q: 'query', role: 'role'} format
  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields.map((item) => ({ [item.name[0]]: item.value })).reduce((acc, item) => ({ ...acc, ...item }), {});

    //for debouncing (it will wait for some time before sending the request to the server, applying to the search filter not in role)

    if ('q' in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => ({ ...prev, ...changedFilterFields }));
    }

  }

  const { user } = userAuthStore();
  if (user?.role !== 'admin') {
    <Navigate to="/" replace={true} />
  }

  const { mutate: userMutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: async (data: CreateUserData) => createUser(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  })

  const { data: users, isFetching, isError, error } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(Object.entries(queryParams).filter((item) => !!item[1]));
      const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString();
      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData, //isLoading will be disabled so we need to use isFetching instead of isLoading, because it is keeping previous data there while it is fetching, keepPreviousData will be used. 

  })

  return <>

    <Space direction="vertical" size="large" style={{ width: '100%' }}>

      <Flex justify="space-between">
        <Breadcrumb separator={<RightOutlined />} items={[
          {
            title: <Link to="/"> Dashboard</Link>

          },
          {
            title: "Users"
          },

        ]} />

        {isFetching && (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)}
        {isError && <Typography.Text type="danger">{error.message}</Typography.Text>}
      </Flex>

      <Form form={filterForm} onFieldsChange={onFilterChange} >

        <UserFilter>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Add User</Button>
        </UserFilter>

      </Form>


      <Table columns={columns} dataSource={users?.data} rowKey={'id'} pagination={
        {
          total: users?.total,
          pageSize: queryParams.perPage,
          current: queryParams.currentPage,
          onChange: (page,) => {
            setQueryParams((prev) => {
              return {
                ...prev,
                currentPage: page,
              }
            })
          }
        }
      } />


      <Drawer title='Create user' width={720} styles={{ body: { background: colorBgLayout } }} destroyOnClose={true} open={drawerOpen} onClose={() => {
        form.resetFields();
        setDrawerOpen(false);

      }}

        extra={
          <Space>
            <Button onClick={() => {
              form.resetFields();
              setDrawerOpen(false)
            }}
            >Cancel</Button>
            <Button type='primary' onClick={onHandleSubmit}>Submit</Button>
          </Space>
        }
      >
        <Form layout='vertical' form={form}>
          <UserForm />
        </Form>
      </Drawer>

    </Space>

  </>


}

export default Users
