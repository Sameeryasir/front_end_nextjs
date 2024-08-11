export async function UpdateById(id, updatedEmployee) {
  const response = await fetch("http://localhost:3000/employee/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  });
  const data = await response.json();
  return data;
}
export async function UpdateByIdemployee(id, status) {
  const response = await fetch("http://localhost:3000/employee/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      isPresent: status 
    }),
  });
  const data = await response.json();
  return data;
}


