import axios from "axios";

export async function registerUser(values) {
    return await  axios.post(`http://127.0.0.1:5000/auth/register`, values).then(
        response => response
    )
}


export async function loginUser(values) {
    return await axios.post(`http://127.0.0.1:5000/auth/login`, values).then(
        response => response
    )
}
