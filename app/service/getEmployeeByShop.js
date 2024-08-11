export async function fetchEmployeesByshop(id){
   const token = localStorage.getItem("token");
   const response = await fetch(
      "http://localhost:3000/employee/shop/"+id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
}