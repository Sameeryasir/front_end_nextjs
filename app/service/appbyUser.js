export async function fetchAppointementbyAdmin() {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "http://localhost:3000/appointement/by-user/:userId",

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
