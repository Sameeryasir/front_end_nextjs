export async function fetchInventoryByShopId(id) {
  const response = await fetch("http://localhost:3000/inventory/shop/" + id);
  const data = await response.json();
  return data;
}
