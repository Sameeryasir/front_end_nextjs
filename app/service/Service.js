export async function fetchService(){
    const response = await fetch("http://localhost:3000/service");
    const data = await response.json();
    return data;
}