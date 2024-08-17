export async function UpdateShop(id,updateshop){
    const response = await fetch(
        "http://localhost:3000/shop/"+id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateshop)
        }
      );
     
      const data = await response.json();
      return data;
    
}