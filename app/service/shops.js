export async function fetchShops(category_id = null, page = 1, limit = 10) {
  const queryString = {};
  if (category_id) {
    queryString["category_id"] = category_id;
  }
  queryString["page"] = page;

  const response = await fetch(
    "http://localhost:3000/shop?" + new URLSearchParams(queryString).toString()
  );
  const data = await response.json();
  return data;
}

export async function fetchShopsById(id) {
  const response = await fetch("http://localhost:3000/shop/" + id);
  const data = await response.json();
  return data;
}
