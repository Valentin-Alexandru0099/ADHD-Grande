import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_API_URL } from "../App";


export default function LoginForm(){

    let navigate = useNavigate();
    async function login() {
        await axios.post(BASE_API_URL + "users/login", {
            "username": document.querySelector("#username").value,
            "password": document.querySelector("#password").value,
        })
            .then(response => {
                console.log(response);
            })
            .finally(navigate("/"));
    };


    return (
        <>
            <form onSubmit={login}>
                <label>Username
                    <input type="text" id="username" defaultValue="" /></label>
                <label>Password
                    <input type="password" id="password" defaultValue="" /></label>
                <input type="submit" />
            </form>
        </>
    );
};