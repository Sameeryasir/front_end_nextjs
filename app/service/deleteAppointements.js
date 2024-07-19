    export async function DeleteAppointementsById(id) {
        const response = await fetch("http://localhost:3000/appointement/"+id , {
            method: 'DELETE'
          });
    const data = await response.json();
    return data;
    }
