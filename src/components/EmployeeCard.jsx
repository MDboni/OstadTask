import { Card, Progress, Tag } from "antd";

export default function EmployeeCard({ data }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
      {data.map(e => (
        <Card key={e.id} title={e.name}>
          <p>{e.department}</p>
          <Progress percent={e.performance} />
          <Tag color={e.archived ? "red" : "green"}>
            {e.archived ? "Archived" : "Active"}
          </Tag>
        </Card>
      ))}
    </div>
  );
}
