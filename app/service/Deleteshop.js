export async function deleteShopById(id){
    const response = await fetch("http://localhost:3000/shop/"+id,{
    method:'DELETE'
    });
    const data = await response.json();
    return data;
}