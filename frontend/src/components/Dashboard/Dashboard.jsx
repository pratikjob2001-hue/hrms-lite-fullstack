import { useEffect, useState } from "react";
import { getEmployeeList } from "../../api/employeeApi";
import { getAttendanceList } from "../../api/attendanceApi";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const empData = await getEmployeeList();
    const attData = await getAttendanceList();

    setEmployees(empData);
    setAttendance(attData);
  };

  const today = new Date().toISOString().split("T")[0];

  const presentToday = attendance.filter(
    (a) => a.date === today && a.status === "Present"
  ).length;

  const absentToday = attendance.filter(
    (a) => a.date === today && a.status === "Absent"
  ).length;

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Dashboard Summary</h2>

      <div style={cardContainer}>
        <div style={cardStyle}>
          <h3>Total Employees</h3>
          <p style={numberStyle}>{employees.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Attendance Records</h3>
          <p style={numberStyle}>{attendance.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Present Today</h3>
          <p style={{ ...numberStyle, color: "#2ecc71" }}>
            {presentToday}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>Absent Today</h3>
          <p style={{ ...numberStyle, color: "#e74c3c" }}>
            {absentToday}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  backgroundColor: "#1f1f1f",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
};

const numberStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "10px",
  color: "#fff",
};

export default Dashboard;
