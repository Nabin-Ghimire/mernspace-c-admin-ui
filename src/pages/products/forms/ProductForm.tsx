import { Card, Col, Form, Input, message, Row, Select, Space, Switch, Typography, Upload, UploadProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Category, Tenant } from "../../../types"
import { useQuery } from "@tanstack/react-query";
import { getCategories, getTenantsDropdown } from "../../../http/api";
import Pricing from "./Pricing";
import Attributes from "./Attributes";
import React from "react";

const ProductForm = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const selectedCategory = Form.useWatch('categoryId');
  const [imageUrl, setImageUrl] = React.useState('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories();
    }
  }) //if same endpoint is calling in a same render than the cache will be used/.So no tension to recreate the useQuery()

  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: () => getTenantsDropdown().then((res) => res.data)
  })

  const uploadConfig: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        messageApi.error('You can only upload JPG/PNG file!');
        return false
      }

      setImageUrl(URL.createObjectURL(file));

      return false
    }
  }

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
                      <Select.Option value={JSON.stringify(category)} key={category._id}>{category.name}</Select.Option>
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
                  {contextHolder}
                  <Upload listType="picture-card" {...uploadConfig}>
                    {
                      imageUrl ? (
                        <img
                          src={imageUrl}
                          alt='avatar'
                          style={{ width: '100%' }} />
                      ) : (
                        <Space direction="vertical">
                          <PlusOutlined />
                          <Typography.Text>Upload</Typography.Text>
                        </Space>
                      )
                    }

                  </Upload>
                </Form.Item>
              </Col>

            </Row>
          </Card>

          {
            selectedCategory &&
            <Pricing selectedCategory={selectedCategory} />
          }
          {
            selectedCategory &&
            <Attributes selectedCategory={selectedCategory} />
          }

          <Card title="Tenant info">
            <Row gutter={24}>
              <Col span={24} >
                <Form.Item name='tenantId' label='Restaurant'
                  rules={[
                    {
                      required: true,
                      message: 'Restaurant is required'
                    }
                  ]}>
                  <Select
                    allowClear={true}
                    size='large' style={{ width: '100%' }}
                    onChange={() => { }}
                    placeholder='Select Restaurant'>
                    {
                      tenants?.tenants.map((tenant: Tenant) => (<Select.Option value={tenant.id}>{tenant.name}</Select.Option>))
                    }
                  </Select>
                </Form.Item>
              </Col>

            </Row>
          </Card>

          <Card title="Other Properties">
            <Row gutter={24}>
              <Col span={24} >
                <Space>
                  <Form.Item name='isPublish'>
                    <Switch defaultChecked={false} checkedChildren="Yes" unCheckedChildren="No" />
                  </Form.Item>
                  <Typography.Text style={{ marginBottom: 22, display: 'block' }}>Published</Typography.Text>
                </Space>
              </Col>

            </Row>
          </Card>

        </Space>
      </Col>
    </Row>
  )
}

export default ProductForm