import { Card, Col, Form, Input, Row } from "antd"

type tenantFilterProps = {
  children: React.ReactNode
}

const TenantFilter = ({ children }: tenantFilterProps) => {
  return (
    <Card>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col >
          <Form.Item name='q'>
            <Input.Search placeholder='Search' allowClear={true}
            />
          </Form.Item>
        </Col>
        <Col>
          {children}
        </Col>
      </Row>
    </Card>
  )
}

export default TenantFilter