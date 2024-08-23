export async function GetRatings(id, page = 1, limit = 10) {
  const queryString = new URLSearchParams({ page: page.toString(), limit: limit.toString() });

  const response = await fetch(`http://localhost:3000/rating/${id}?${queryString}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
