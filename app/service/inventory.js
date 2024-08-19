export async function fetchInventoryByShopId(id, page = 1, limit = 10) {
  const queryString = new URLSearchParams({
    page: page,
    limit: limit,
  }).toString();

  console.log(queryString);

  const response = await fetch(
    `http://localhost:3000/inventory/shop/${id}?${queryString}`
  );
  const data = await response.json();
  return data;
}
