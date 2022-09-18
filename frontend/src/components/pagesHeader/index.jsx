import {useNavigate} from 'react-router-dom';
import React from "react";
import "./index.css"


const PagesHeader = ({username,setUsername, type,id}) => {
    let menu;
    const navigate = useNavigate();
    const logout = async () => {
        await fetch("http://localhost:8080/api/logout", {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        navigate('/')
        setUsername("")
        window.location.reload()
    };
    if (username === "" || typeof(username)==="undefined") {
        menu = (
            <nav>
                <a href="/main" onClick={()=>{navigate('/main')}}>Main Page</a>
                <a href="/" onClick={()=>{logout()}}>Logout</a>
                <a href='/login'>Login</a>
            </nav>
        )
    } else {
        menu = (
            <nav>
                <a href="/main" onClick={()=>{navigate('/main')}}>Main Page</a>
                <a href='/'>User:{username}</a>
                <a href='/'>Type:{type}</a>
                <a href='/'>Id:{id}</a>
                <a href="/" onClick={()=>{logout()}}>Logout</a>
            </nav>
        )
    }
    return (
        <div className="pagesHeader">
            <h2>SILKWAY transit</h2>
            {menu}
        </div>
    )
};

export default PagesHeader;