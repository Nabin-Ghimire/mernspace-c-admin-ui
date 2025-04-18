import { Breadcrumb, Space, Table } from "antd"
import { Link, Navigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { userAuthStore } from "../../store";

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

]

const Users = () => {

  const { user } = userAuthStore();
  if (user?.role !== 'admin') {
    <Navigate to="/" replace={true} />
  }

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return getUsers().then((res) => res.data);
    },
  })

  return <>

    <Space direction="vertical" size="large" style={{ width: '100%' }}>

      <Breadcrumb separator={<RightOutlined />} items={[
        {
          title: <Link to="/"> Dashboard</Link>

        },
        {
          title: "Users"
        },

      ]} />

      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}

      <Table columns={columns} dataSource={users} />

    </Space>

  </>


}

export default Users
