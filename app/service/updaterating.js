export async function updateRating(id){
    const response = await fetch(
        "http://localhost:3000/appointement/apps/"+id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Rated: "accepted", 
          }),
        }
      );  
      const data = await response.json();
  return data;
  }