import axios from "axios"

export default axios.create({
    baseURL: 'http//localhost:5000'
})


export function userAuthenticated()
{
    return axios.get('http://localhost:5000/users/userdetails',{
        headers:{
            "access-token":sessionStorage.getItem("authToken")
        }
    })
    
}


