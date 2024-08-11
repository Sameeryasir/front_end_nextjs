export async function fetchAppointementbyAdmin() {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "http://localhost:3000/appointement/get-my-appointments",

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
