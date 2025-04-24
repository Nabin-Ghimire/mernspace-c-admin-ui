import { Card, Col, Input, Row, Space } from "antd"
import FormItem from "antd/es/form/FormItem"

const TenantForm = () => {
  return <>
    <Row>
      <Col span={24}>
        <Space direction="vertical" size='large'>
          <Card title='Restaurant Name' >
            <Row gutter={20}>
              <Col span={24}>
                <FormItem name='name' label='Name' rules={[
                  {
                    required: true,
                    message: 'Name is required'
                  }
                ]}>
                  <Input size="large" />
                </FormItem>
              </Col>
            </Row>
          </Card>

          <Card title='Restaurant Address'>
            <Row gutter={20}>
              <Col span={24}>
                <FormItem name='address' label='Address' rules={[
                  {
                    required: true,
                    message: 'Restaurant address is required'
                  }
                ]}>
                  <Input size="large" />
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Space>

      </Col>
    </Row>
  </>
}

export default TenantForm;