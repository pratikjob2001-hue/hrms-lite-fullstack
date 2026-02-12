const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://hrms-lite-backend-q76v.onrender.com/api";

/* =====================================
   GET ALL EMPLOYEES
===================================== */
export const getEmployeeList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/employees/`);

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

/* =====================================
   ADD NEW EMPLOYEE
===================================== */
export const addEmployee = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (typeof result === "object") {
        const firstKey = Object.keys(result)[0];
        const message = result[firstKey]?.[0] || "Validation error";
        throw new Error(message);
      }
      throw new Error("Failed to add employee");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

/* =====================================
   DELETE EMPLOYEE
===================================== */
export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    return true;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
