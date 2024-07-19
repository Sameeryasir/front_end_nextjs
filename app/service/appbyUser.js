export async function fetchAppointementbyAdmin(){

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:appointement/by-user/",

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