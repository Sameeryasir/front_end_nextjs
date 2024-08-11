export async function CreateShop(shopData) {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shopData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create shop');
    }
  
    const data = await response.json();
    return data;
  }
  