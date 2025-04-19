import { Card, Col, Input, Row, Select } from 'antd'



type userFilterProps = {
  children?: React.ReactNode;
  onFilterChange: (fiterName: string, filterValue: string) => void
}

const UserFilter = ({ onFilterChange, children }: userFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>

            <Col span={8}>
              <Input.Search placeholder='Search'
                allowClear={true}
                onChange={(e) => onFilterChange('searchFilter', e.target.value)} />
            </Col>


            <Col span={8}>
              <Select allowClear={true} style={{ width: '100%' }} placeholder='Role'
                onChange={(selectedValue) => onFilterChange('roleFilter', selectedValue)}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
              </Select>
            </Col>


            <Col span={8}>
              <Select allowClear={true} style={{ width: '100%' }} placeholder='Status'
                onChange={(selectedValue) => onFilterChange('statusFilter', selectedValue)}
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>

              </Select>
            </Col>

          </Row>
        </Col>

        <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
          {children}
        </Col>
      </Row>
    </Card>
  )
}

export default UserFilter