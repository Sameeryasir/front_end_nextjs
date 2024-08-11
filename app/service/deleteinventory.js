export async function deleteInventoryById(id){
const response = await fetch("http://localhost:3000/inventory/"+id,{
    method:'DELETE'
})
const data= await response.json();
return data;
}