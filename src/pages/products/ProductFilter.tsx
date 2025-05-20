import { useQuery } from "@tanstack/react-query"
import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd"
import { getCategories, getTenantsDropdown } from "../../http/api"
import { Category, Tenant } from "../../types"


type ProductFilterProps = {
  children?: React.ReactNode
}
const ProductFilter = ({ children }: ProductFilterProps) => {

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => {
      return getTenantsDropdown();
    }
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategories();
    }
  })
  console.log(categories);

  return <Card>
    <Row justify="space-between">

      <Col span={16}>

        <Row gutter={20}>

          <Col span={6}>
            <Form.Item name='q'>
              <Input.Search placeholder='Search'
                allowClear={true}
              />
            </Form.Item>
          </Col>


          <Col span={6}>
            <Form.Item name='category'>
              <Select allowClear={true} style={{ width: '100%' }} placeholder='Select Category'>
                {
                  categories?.data.map((category: Category) => {
                    return (
                      <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name='restaurant'>
              <Select allowClear={true} style={{ width: '100%' }} placeholder='Select Restaurant'>
                {
                  restaurants?.data.tenants.map((tenant: Tenant) => {
                    return (
                      <Select.Option key={tenant.id} value={tenant.id}>{tenant.name}</Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>

          </Col>

          <Col span={6}>
            <Space>
              <Switch defaultChecked onChange={() => { }} />
              <Typography.Text>Show only published</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>



      <Col span={6} style={{ display: 'flex', justifyContent: 'end' }}>
        {children}
      </Col>
    </Row>
  </Card>
}

export default ProductFilter