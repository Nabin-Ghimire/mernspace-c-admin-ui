import { Card, Col, Form, Input, Row, Select, Space, Typography, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Category } from "../../../types"
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../http/api";

const ProductForm = () => {

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories();
    }
  }) //if same endpoint is calling in a same render than the cache will be used/.So no tension to recreate the useQuery()

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size='large'>
          <Card title="Product Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name='name' label='Product Name' rules={[
                  {
                    required: true,
                    message: 'Product name is required'
                  }
                ]}>
                  <Input size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='categoryId' label='Category' rules={[
                  {
                    required: true,
                    message: 'Category is required'
                  }
                ]}>
                  <Select
                    allowClear={true}
                    id='selectBoxInUserForm'
                    size='large' style={{ width: '100%' }}
                    onChange={() => { }}
                    placeholder='Select Category'>

                    {categories?.data.map((category: Category) => (
                      <Select.Option value={category._id} key={category._id}>{category.name}</Select.Option>
                    ))}

                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='description' label='Description'
                  rules={[
                    {
                      required: true,
                      message: 'Description is required'
                    },
                  ]}>
                  <Input.TextArea rows={2} style={{ resize: "none" }} maxLength={100} size='large' />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Product Image">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item name='image' label=''
                  rules={[
                    {
                      required: true,
                      message: 'Please upload a product image'
                    },
                  ]}>
                  <Upload listType="picture-card">
                    <Space direction="vertical">
                      <PlusOutlined />
                      <Typography.Text>Upload</Typography.Text>
                    </Space>
                  </Upload>
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
                  <Select
                    id='selectBoxInUserForm'
                    size='large' style={{ width: '100%' }}
                    onChange={() => { }}
                    placeholder='Select Role'>

                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* {
              selectedRole === 'manager' && (
                <Col span={12} >
                  <Form.Item name='tenantId' label='Restaurant'
                    rules={[
                      {
                        required: true,
                        message: 'Restaurant is required'
                      }
                    ]}>
                    <Select
                      size='large' style={{ width: '100%' }}
                      onChange={() => { }}
                      placeholder='Select Restaurant'>
                      {
                        tenants?.tenants.map((tenant: Tenant) => (<Select.Option value={tenant.id}>{tenant.name}</Select.Option>))
                      }
                    </Select>
                  </Form.Item>
                </Col>
              )
            } */}

            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  )
}

export default ProductForm