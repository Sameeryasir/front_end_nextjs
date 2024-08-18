export async function fetchAppointmentsByShopId(id, page = 1, limit = 10) {
  const queryString = new URLSearchParams({
    page: page,
    limit: limit
  }).toString();

  const response = await fetch(
    `http://localhost:3000/appointement/shop/${id}?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}
