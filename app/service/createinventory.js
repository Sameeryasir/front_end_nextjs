export async function CreateInventories(inventorydata) {
  const token = localStorage.getItem("token");
  const response = await fetch("localhost:3000/inventory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inventorydata),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create inventory");
  }

  const data = await response.json();
  return data;
}
export async function UpdateInventories(id, UpdateInventories) {
  const response = await fetch("http://localhost:3000/inventory/shop/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UpdateInventories),
});
const data = await response.json();
return data;

}
