export async function fetchshopsByUserId(page = 1, limit = 10) {
  const queryString = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  }).toString();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("No token found in localStorage");
  }

  try {
    const response = await fetch(
      `http://localhost:3000/shop/my-shops?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch shops:", error);
    throw error; // Re-throw error after logging
  }
}
