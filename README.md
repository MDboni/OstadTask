Interview Task (Employee Dashboard)
Goal: Enhance the Employee Management Dashboard into a more feature-rich and
interactive application — simulating a real-world admin panel.
Core Features (CRUD Enhancement)
1. Full CRUD with Persistent Storage
• Replace mock data with localStorage or mock API (JSON Server / Or Local State).
• Ensure data updates persist after refresh.
• Handle error and loading states with Ant Design <Spin /> and <Alert />.
2. Enhanced Edit Flow
• Use a Drawer instead of a Modal for editing employees.
• Pre-fill the form with employee data.
• Include a “Save & Continue Editing” button.
3. Soft Delete
• Instead of removing directly, mark as “Archived” with a Tag.
• Add a toggle switch to view Active / Archived employees.
Search & Filter (Advanced)
4. Global Search Bar
• Implement debounced search (500ms delay using useEffect + setTimeout).
• Search across multiple fields (name, department, role, status).
5. Multi-Filter System
• Combine filters:
o Department (Dropdown)
o Status (Dropdown)
o Joining Date Range (RangePicker)
• Use AntD’s Form layout for clean control alignment.
6. Sorting
• Enable sorting on all columns (name, department, joining date).
• Preserve sort state between page reloads using localStorage.
UI/UX & Layout
7. Responsive Layout
• Use AntD Grid and Card view toggle:
o Table View (default)
o Card View (toggle icon)

8. Toast Notifications
• Use Ant Design’s message or notification after Add/Edit/Delete.

9. Pagination
• Use AntD Table built-in pagination.
• Add “Items per page” selector.
10. Empty State
• Show a friendly image + message when no data matches filters.
11. Validation Rules
• Use AntD Form validation:
o Name: required
o Department: required
o Role: required
o Joining Date: not future date
o Status: required
12. Bonus Challenge
• Add a Performance Score field (1–100).
• Render it using an AntD Progress bar in the table.

lIVE lINK : 

<img width="1356" height="496" alt="image" src="https://github.com/user-attachments/assets/b092574b-6c0d-4320-8ff5-8108a88d7767" />

<img width="1359" height="591" alt="image" src="https://github.com/user-attachments/assets/ac3cf238-5541-43da-8e82-c52c36615661" />


