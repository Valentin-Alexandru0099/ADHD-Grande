import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_API_URL } from "../App";


export default function RegisterForm() {

    let navigate = useNavigate();
    async function register() {
        await axios.post(BASE_API_URL + "users/register", {
            "username": document.querySelector("#username").value,
            "password": document.querySelector("#password").value,
            "email": document.querySelector("#email").value
        })
            .then(response => {
                console.log(response);
            })
            .finally(navigate("/login"));
    };


    return (
        <>
            <form onSubmit={register}>
                <label>Username
                    <input type="text" id="username" defaultValue="" /></label>
                <label>Password
                    <input type="password" id="password" defaultValue="" /></label>
                <label>Confirm Password
                    <input type="password" id="confirm-password" defaultValue="" /></label>
                <label>Email
                    <input type="email" id="email" defaultValue="" /></label>
                <input type="submit" />
            </form>
        </>
    );
};