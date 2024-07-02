export async function fetchSignUp( ) {
    const response = await fetch("http://localhost:3000/auth/signup");
    const data = await response.json();
    return data;
  };