export async function fetchShops() {
  const response = await fetch("http://localhost:3000/shop");
  const data = await response.json();
  return data;
}
