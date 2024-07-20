export async function updatebyId(id){
    const response = await fetch(
        "http://localhost:3000/appointement/"+id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "accepted", 
          }),
        }
      );  
      const data = await response.json();
 return data;
}
