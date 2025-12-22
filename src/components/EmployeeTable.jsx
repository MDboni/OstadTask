import {
  Table,
  Progress,
  Tag,
  Button,
  Space,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function EmployeeTable({ data, onEdit, onArchive, onDelete }) {
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      sorter: true,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: true,
      render: (dept) => <Tag color="blue">{dept}</Tag>,
    },
    {
      title: "Performance",
      render: (_, r) => (
        <Progress
          percent={r.performance}
          size="small"
          status={
            r.performance >= 75
              ? "success"
              : r.performance >= 40
              ? "active"
              : "exception"
          }
        />
      ),
    },
    {
      title: "Status",
      render: (_, r) =>
        r.archived ? (
          <Tag color="volcano">Archived</Tag>
        ) : (
          <Tag color="green">Active</Tag>
        ),
    },
    {
      title: "Actions",
      align: "center",
      render: (_, r) => (
        <Space>
          <Tooltip title="Edit employee">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(r)}
            />
          </Tooltip>

          {!r.archived && (
            <Tooltip title="Archive employee">
              <Button
                size="small"
                icon={<InboxOutlined />}
                onClick={() => onArchive(r.id)}
              />
            </Tooltip>
          )}

          <Popconfirm
            title="Delete permanently?"
            description="This action cannot be undone"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(r.id)}
          >
            <Tooltip title="Delete employee">
              <Button size="small" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background:
          "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
        }}
        bordered
        size="middle"
        rowClassName={(_, index) =>
          index % 2 === 0 ? "row-light" : "row-dark"
        }
      />

      {/* Inline style for row colors */}
      <style>
        {`
          .row-light td {
            background: #ffffff;
          }

          .row-dark td {
            background: #f6f8ff;
          }

          .ant-table-thead > tr > th {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            font-weight: 600;
          }

          .ant-table-row:hover td {
            background: #e6f0ff !important;
          }
        `}
      </style>
    </div>
  );
}
