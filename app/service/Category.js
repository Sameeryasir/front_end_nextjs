export async function fetchCategory() {
    const response = await fetch("http://localhost:3000/category");
    const data = await response.json();
    return data;
  }