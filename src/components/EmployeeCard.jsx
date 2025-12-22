import { Card, Progress, Tag } from "antd";

const gradients = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #43cea2, #185a9d)",
  "linear-gradient(135deg, #ff9966, #ff5e62)",
  "linear-gradient(135deg, #56ab2f, #a8e063)",
];

export default function EmployeeCard({ data }) {
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 16,
        background: "linear-gradient(120deg, #fdfbfb, #ebedee)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
      }}
    >
      {data.map((e, i) => (
        <Card
          key={e.id}
          hoverable
          style={{
            borderRadius: 16,
            color: "#fff",
            background: gradients[i % gradients.length],
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
          bodyStyle={{ padding: 20 }}
        >
          <h3 style={{ color: "#fff", marginBottom: 4 }}>{e.name}</h3>
          <p style={{ opacity: 0.9 }}>{e.department}</p>

          <Progress
            percent={e.performance}
            strokeColor="#fff"
            trailColor="rgba(255,255,255,0.3)"
          />

          <Tag
            color={e.archived ? "red" : "green"}
            style={{ marginTop: 8 }}
          >
            {e.archived ? "Archived" : "Active"}
          </Tag>
        </Card>
      ))}
    </div>
  );
}
