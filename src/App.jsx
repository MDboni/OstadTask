import { useEffect, useState } from "react";
import {
  Button,
  Switch,
  Row,
  Col,
  Typography,
  Spin,
  Alert,
  message,
} from "antd";

import { getEmployees, saveEmployees } from "./services/employeeService";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeDrawer from "./components/EmplyeeDrawer";
import Filters from "./components/Filters";
import EmptyState from "./components/EmptyState";

const { Title } = Typography;

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [cardView, setCardView] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    dateRange: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load
  useEffect(() => {
    try {
      setEmployees(getEmployees());
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search + filters
  useEffect(() => {
    const timer = setTimeout(() => {
      let data = employees.filter(e => e.archived === showArchived);

      if (filters.search) {
        const s = filters.search.toLowerCase();
        data = data.filter(e =>
          [e.name, e.department, e.role].some(v =>
            v.toLowerCase().includes(s)
          )
        );
      }

      if (filters.department)
        data = data.filter(e => e.department === filters.department);

      if (filters.status)
        data = data.filter(e =>
          (e.archived ? "Archived" : "Active") === filters.status
        );

      if (filters.dateRange.length === 2) {
        data = data.filter(e =>
          new Date(e.joiningDate) >= filters.dateRange[0] &&
          new Date(e.joiningDate) <= filters.dateRange[1]
        );
      }

      setFiltered(data);
    }, 500);

    return () => clearTimeout(timer);
  }, [employees, filters, showArchived]);

  const upsertEmployee = (emp, continueEdit = false) => {
    const updated = editing
      ? employees.map(e => (e.id === emp.id ? emp : e))
      : [...employees, { ...emp, id: Date.now(), archived: false }];

    setEmployees(updated);
    saveEmployees(updated);
    message.success(editing ? "Updated" : "Added");

    if (!continueEdit) {
      setDrawerOpen(false);
      setEditing(null);
    }
  };

  const archiveEmployee = (id) => {
    const updated = employees.map(e =>
      e.id === id ? { ...e, archived: true } : e
    );
    setEmployees(updated);
    saveEmployees(updated);
    message.info("Archived");
  };

  const deleteEmployee = (id) => {
    const updated = employees.filter(e => e.id !== id);
    setEmployees(updated);
    saveEmployees(updated);
    message.success("Deleted");
  };

  return (
    <div className="dashboard-container">
      <Row justify="space-between" align="middle">
        <Title level={3}>Employee Dashboard</Title>
        <Row gutter={12}>
          <Switch
            checked={showArchived}
            onChange={setShowArchived}
            checkedChildren="Archived"
            unCheckedChildren="Active"
          />
          <Switch
            checked={cardView}
            onChange={setCardView}
            checkedChildren="Card"
            unCheckedChildren="Table"
          />
        </Row>
      </Row>

      <Filters filters={filters} setFilters={setFilters} />

      <Row justify="end" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          Add Employee
        </Button>
      </Row>

      {loading && <Spin size="large" />}
      {error && <Alert type="error" message={error} />}

      {!loading && filtered.length === 0 && <EmptyState />}

      {!loading && filtered.length > 0 && (
        cardView ? (
          <EmployeeCard data={filtered} />
        ) : (
          <EmployeeTable
            data={filtered}
            onEdit={(e) => {
              setEditing(e);
              setDrawerOpen(true);
            }}
            onArchive={archiveEmployee}
            onDelete={deleteEmployee}
          />
        )
      )}

      <EmployeeDrawer
        open={drawerOpen}
        employee={editing}
        onClose={() => {
          setDrawerOpen(false);
          setEditing(null);
        }}
        onSubmit={upsertEmployee}
      />
    </div>
  );
}
