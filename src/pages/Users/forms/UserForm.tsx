import { useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd'
import { getTenants } from '../../../http/api';
import { Tenant } from '../../../types';


const UserForm = () => {

  const { data: tenants, } = useQuery({
    queryKey: ['tenants'],
    queryFn: () => {
      return getTenants().then((res) => res.data);
    }
  })

  return <Row>
    <Col span={24}>
      <Space direction="vertical" size='large'>
        <Card title="Basic Info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name='firstName' label='First Name' rules={[
                {
                  required: true,
                  message: 'First name is required'
                }
              ]}>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='lastName' label='Last Name' rules={[
                {
                  required: true,
                  message: 'Last name is required'
                }
              ]}>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='email' label='Email'
                rules={[
                  {
                    required: true,
                    message: 'Email name is required'
                  },
                  {
                    type: 'email',
                    message: 'Enter a valid email'
                  }
                ]}>
                <Input size='large' />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Security Info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name='password' label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Password is required'
                  },
                  {
                    min: 8,
                    message: 'Password must be at least 8 characters long'
                  }
                ]}>
                <Input.Password size='large' />
              </Form.Item>
            </Col>

          </Row>
        </Card>

        <Card title="Role and Tenant info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name='role' label='Role'
                rules={[
                  {
                    required: true,
                    message: 'Role is required'
                  }
                ]}
              >
                <Select size='large' style={{ width: '100%' }}
                  onChange={() => { }}
                  placeholder='Select Role'>

                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12} >
              <Form.Item name='tenantId' label='Restaurant'
                rules={[
                  {
                    required: true,
                    message: 'Restaurant is required'
                  }
                ]}>
                <Select size='large' style={{ width: '100%' }}
                  onChange={() => { }}
                  placeholder='Select Restaurant'>
                  {
                    tenants?.map((tenant: Tenant) => (<Select.Option value={tenant.id}>{tenant.name}</Select.Option>))
                  }
                </Select>
              </Form.Item>
            </Col>

          </Row>
        </Card>
      </Space>
    </Col>
  </Row>
}
export default UserForm;
