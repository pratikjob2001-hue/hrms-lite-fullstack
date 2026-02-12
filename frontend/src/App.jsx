import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeForm from "./components/Employee/EmployeeForm";
import EmployeeList from "./components/Employee/EmployeeList";
import AttendanceForm from "./components/Attendance/AttendanceForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshEmployees = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={appContainer}>
      <div style={mainCard}>
        <h1 style={titleStyle}>HRMS Lite</h1>

        {/* ===== DASHBOARD ===== */}
        <Dashboard />
        <hr style={divider} />

        {/* ===== EMPLOYEE SECTION ===== */}
        <EmployeeForm refreshEmployees={refreshEmployees} />
        <hr style={divider} />
        <EmployeeList refreshTrigger={refresh} />
        <hr style={divider} />

        {/* ===== ATTENDANCE SECTION ===== */}
        <AttendanceForm />
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const appContainer = {
  minHeight: "100vh",
  backgroundColor: "#121212",
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
};

const mainCard = {
  width: "100%",
  maxWidth: "1100px",
  backgroundColor: "#181818",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
  color: "#ffffff",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "32px",
};

const divider = {
  border: "1px solid #333",
  margin: "30px 0",
};

export default App;
