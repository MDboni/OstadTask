import { Input, Select, DatePicker, Row, Col } from "antd";

const { RangePicker } = DatePicker;

export default function Filters({ filters, setFilters }) {
  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col xs={24} md={8}>
        <Input
          placeholder="Search"
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
      </Col>

      <Col xs={24} md={6}>
        <Select
          placeholder="Department"
          allowClear
          style={{ width: "100%" }}
          onChange={(v) =>
            setFilters({ ...filters, department: v || "" })
          }
        >
          <Select.Option value="HR">HR</Select.Option>
          <Select.Option value="IT">IT</Select.Option>
          <Select.Option value="Finance">Finance</Select.Option>
        </Select>
      </Col>

      <Col xs={24} md={5}>
        <Select
          placeholder="Status"
          allowClear
          style={{ width: "100%" }}
          onChange={(v) =>
            setFilters({ ...filters, status: v || "" })
          }
        >
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Archived">Archived</Select.Option>
        </Select>
      </Col>

      <Col xs={24} md={5}>
        <RangePicker
          style={{ width: "100%" }}
          onChange={(v) =>
            setFilters({ ...filters, dateRange: v || [] })
          }
        />
      </Col>
    </Row>
  );
}
