import { Card, Col, Form, Input, Row } from 'antd'
import React from 'react'


const UserForm = () => {
  return <Row>
    <Col span={24}>
      <Card title="Basic Info">
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item name='firstName' label='First Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='lastName' label='Last Name'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
}
export default UserForm;
