export async function fetchAppointements(){
    const response = await fetch("http://localhost:3000/appointement");
    const data = await response.json();
    return data;
}
export async function  fetchAppointementsByUserId(){
    const response = await fetch("http://localhost:3000/appointement/get-my-appointments")
    const data = await response.json();
    return data;
}