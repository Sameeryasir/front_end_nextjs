export async function updatebyStatus(id, status) {
    const response = await fetch(
      "http://localhost:3000/shop/"+id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isOpen: status ? "true" : "false",
        }),
      }
    );  
    const data = await response.json();
    return data;
  }
  