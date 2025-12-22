import { Drawer, Form, Input, Button, DatePicker, InputNumber, Space } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function EmployeeDrawer({
  open,
  onClose,
  employee,
  onSubmit,
}) {
  const [form] = Form.useForm();

  // Prefill form when editing
  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        name: employee.name,
        department: employee.department,
        role: employee.role,
        joiningDate: dayjs(employee.joiningDate),
        performance: employee.performance,
      });
    } else {
      form.resetFields();
    }
  }, [employee, form]);

  // Normal Save (close drawer)
  const onFinish = (values) => {
    onSubmit(
      {
        ...employee,
        ...values,
        joiningDate: values.joiningDate.toISOString(),
      },
      false // ❌ do not continue editing
    );
    onClose();
  };

  // Save & Continue Editing
  const handleSaveAndContinue = () => {
    form.validateFields().then((values) => {
      onSubmit(
        {
          ...employee,
          ...values,
          joiningDate: values.joiningDate.toISOString(),
        },
        true // ✅ continue editing
      );
    });
  };

  return (
    <Drawer
      title={employee ? "Edit Employee" : "Add Employee"}
      open={open}
      onClose={onClose}
      width={420}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>

        {/* Department */}
        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Department is required" }]}
        >
          <Input placeholder="HR / IT / Finance" />
        </Form.Item>

        {/* Role */}
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Input placeholder="Frontend Developer" />
        </Form.Item>

        {/* Joining Date */}
        <Form.Item
          label="Joining Date"
          name="joiningDate"
          rules={[
            { required: true, message: "Joining date is required" },
            () => ({
              validator(_, value) {
                if (!value || value.isBefore(dayjs(), "day")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Joining date cannot be in the future")
                );
              },
            }),
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Performance */}
        <Form.Item
          label="Performance Score"
          name="performance"
          rules={[{ required: true, message: "Performance is required" }]}
        >
          <InputNumber
            min={1}
            max={100}
            style={{ width: "100%" }}
            placeholder="1 - 100"
          />
        </Form.Item>

        {/* Buttons */}
        <Form.Item>
          <Space style={{ width: "100%" }} direction="vertical">
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>

            <Button onClick={handleSaveAndContinue} block>
              Save & Continue Editing
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
