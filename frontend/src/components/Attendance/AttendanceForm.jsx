import { useEffect, useState } from "react";
import { getEmployeeList } from "../../api/employeeApi";
import {
  getAttendanceList,
  addAttendance,
} from "../../api/attendanceApi";

function AttendanceForm() {
  const [employees, setEmployees] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    const data = await getEmployeeList();
    setEmployees(data);
  };

  const fetchAttendance = async () => {
    setLoading(true);
    const data = await getAttendanceList();
    setAttendanceList(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee || !date) {
      alert("Please select employee and date");
      return;
    }

    await addAttendance({
      employee: selectedEmployee,
      date,
      status,
    });

    setDate("");
    fetchAttendance();
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Attendance</h2>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit" style={addButton}>
          Add Attendance
        </button>
      </form>

      {/* ===== TABLE ===== */}
      <h3 style={{ marginTop: "30px" }}>Attendance Records</h3>

      {loading ? (
        <p>Loading attendance...</p>
      ) : attendanceList.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={headerRow}>
              <th style={thStyle}>Employee</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((item) => (
              <tr key={item.id} style={rowStyle}>
                <td style={tdStyle}>{item.employee_name}</td>
                <td style={tdStyle}>{item.date}</td>
                <td
                  style={{
                    ...tdStyle,
                    color:
                      item.status === "Present"
                        ? "#2ecc71"
                        : "#e74c3c",
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ===== STYLES ===== */

const formStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "15px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #444",
  backgroundColor: "#1f1f1f",
  color: "#fff",
};

const addButton = {
  padding: "8px 15px",
  backgroundColor: "#3498db",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  cursor: "pointer",
};

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
  color: "#fff",
};

const rowStyle = {
  borderBottom: "1px solid #333",
};

const tdStyle = {
  padding: "10px",
  color: "#ddd",
};

export default AttendanceForm;
