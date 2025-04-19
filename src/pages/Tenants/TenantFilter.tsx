import { Card, Col, Input, Row } from "antd"

type tenantFilterProps = {
  onFilterChange: (filterName: string, filterValue: string) => void
  children: React.ReactNode
}

const TenantFilter = ({ onFilterChange, children }: tenantFilterProps) => {
  return (
    <Card>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col >
          <Input.Search placeholder='Search' allowClear={true}
            onChange={(e) => onFilterChange('searchFilter', e.target.value)} />
        </Col>
        <Col>
          {children}
        </Col>
      </Row>
    </Card>
  )
}

export default TenantFilter