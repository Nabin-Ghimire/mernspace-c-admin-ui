import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd"

type ProductFilterProps = {
  children?: React.ReactNode
}
const ProductFilter = ({ children }: ProductFilterProps) => {
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
            <Form.Item name='role'>
              <Select allowClear={true} style={{ width: '100%' }} placeholder='Select Category'>
                <Select.Option value="pizza">Pizza</Select.Option>
                <Select.Option value="beverages">Beverages</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name='role'>
              <Select allowClear={true} style={{ width: '100%' }} placeholder='Select Restaurant'>
                <Select.Option value="pizza">PizzaHut</Select.Option>
                <Select.Option value="beverages">BreadHub</Select.Option>
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