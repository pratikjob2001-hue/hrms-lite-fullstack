const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://hrms-lite-backend-q76v.onrender.com/api";

/* =================================
   GET ATTENDANCE (WITH FILTERS)
================================= */
export const getAttendanceList = async (employee = "", date = "") => {
  try {
    let url = `${BASE_URL}/attendance/`;

    const params = new URLSearchParams();

    if (employee) params.append("employee", employee);
    if (date) params.append("date", date);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch attendance records");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

/* =================================
   ADD ATTENDANCE
================================= */
export const addAttendance = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/attendance/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const firstKey = Object.keys(result)[0];
      throw new Error(result[firstKey]?.[0] || "Error adding attendance");
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
