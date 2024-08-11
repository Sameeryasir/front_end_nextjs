export async function deleteEmployeesById(id){
    const response = await fetch("http://localhost:3000/employee/"+id,{
        method:'DELETE'
    });
    const data = await response.json();
    return data;
}