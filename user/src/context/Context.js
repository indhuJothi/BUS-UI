import React from "react";

export const userContext = React.createContext({ user:{
    name:"",
    email:"",
    mobile:"",
    password:""
} });
