import axios from "axios"


let baseUrl
export default baseUrl= axios.create({
    baseURL: 'http://localhost:5000'
})


export function userAuthenticated()
{
    return baseUrl.get('http://localhost:5000/users/userdetails',{
        headers:{
            "access-token":sessionStorage.getItem("authToken")
        }
    })
    
}


