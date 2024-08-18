export async function fetchAppointements() {
  const response = await fetch("http://localhost:3000/appointement");
  const data = await response.json();
  return data;
}
export async function fetchAppointementsByUserId(page=1,limit=10) {
  const token = localStorage.getItem("token");
  const queryString= new URLSearchParams({
    page:page,
    limit:limit
  }).toString()
  const response = await fetch(
    `http://localhost:3000/appointement/get-my-appointments?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
