export async function fetchEmployees() {
    const response = await fetch("http://localhost:3000/employee");
    const data = await response.json();
    return data;
  }
  