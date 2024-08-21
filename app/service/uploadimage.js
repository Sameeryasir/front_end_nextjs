export async function uploadImage(data){
    const response = await fetch(
        "http://localhost:3000/shop/upload",
        {
            method:'Post',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                data
            })
        }
    );
    const data = await response.json()
}