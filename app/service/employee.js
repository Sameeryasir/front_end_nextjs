export async function fetchEmployees() {
    const response = await fetch("http://localhost:3000/employee");
    const data = await response.json();
    return data;
  }
  export async function fetchEmployeesbyId(id){
    const response = await fetch("http://localhost:3000/employee/"+id);
    const data = await response.json();
    return data;
  }