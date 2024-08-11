export async function CreateEmployees(employeeData){
 const token = localStorage.getItem("token");
 const response = await fetch ("http://localhost:3000/employee",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create employee');
  }

  const data = await response.json();
  return data;

}