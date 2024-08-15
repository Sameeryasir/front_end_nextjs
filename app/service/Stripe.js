export async function Stripe(){
    const response = await fetch ('localhost:3000/stripe/checkout-session',{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
    },
    
    })
    const data = await response.json();
    return data;
}