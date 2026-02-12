import { useEffect, useState } from "react";
import { getEmployeeList, deleteEmployee } from "../../api/employeeApi";

function EmployeeList({ refreshTrigger }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployeeList();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Employee List</h2>

      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p>No Employees Found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={headerRow}>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Joining Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={rowStyle}>
                <td style={tdStyle}>{emp.employee_id}</td>
                <td style={tdStyle}>{emp.name}</td>
                <td style={tdStyle}>{emp.email}</td>
                <td style={tdStyle}>{emp.department}</td>
                <td style={tdStyle}>{emp.joining_date}</td>
                <td style={tdStyle}>
                  <button
                    style={deleteButton}
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ====== STYLES ====== */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
  backgroundColor: "#1f1f1f",
  borderRadius: "8px",
  overflow: "hidden",
};

const headerRow = {
  backgroundColor: "#2c2c2c",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  color: "#ffffff",
  fontWeight: "600",
};

const rowStyle = {
  borderBottom: "1px solid #333",
};

const tdStyle = {
  padding: "10px",
  color: "#ddd",
};

const deleteButton = {
  padding: "6px 12px",
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default EmployeeList;
