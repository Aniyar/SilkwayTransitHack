import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import "./index.css"

const LoginPageContainer = ({setUsername}) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                id,
                password
            })
        });
        const data = await response.json()
        console.log(data.message);
        if (data.message === "success") {
            navigate("/main");
        } else {
            alert("Incorrect Password")
        }
        setUsername(data.name + " " + data.surname);
    }
    return (
        <div className="loginPageContainer">
            <form onSubmit={loginUser}>
                <h1>Sign Up page</h1>
                <input className="loginPageContainer-input1" type={"id"} id={"id"} placeholder={"Id"} onChange={e => setId(e.target.value)} />
                <input className="loginPageContainer-input2" type={"password"} id={"inputPassword"} placeholder={"Password"} onChange={e => setPassword(e.target.value)} />
                <button onClick={loginUser}>Login</button>
            </form>
        </div>
    )
};

export default LoginPageContainer;