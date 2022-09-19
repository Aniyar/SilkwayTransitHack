import {BrowserRouter, Route, Routes } from 'react-router-dom';
import {React, useState, useEffect} from "react";
import Register from './pages/register';
import MainPage from './pages/mainpage';
import Login from './pages/login';
import PagesHeader from  './components/pagesHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import Depo from './pages/depo';
import Track from './pages/track';

const App = () => {
    const [username, setUsername] = useState("")
    const [type, setType] = useState("")
    const [id, setId] = useState("")
    useEffect(()=> {
        (
            async () => {
                const response = await fetch("http://localhost:8080/api/driver", {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const data = await response.json()
                setUsername(data.name+" "+data.surname)
                setType(data.type)
                setId(data.id)
            }
        )();
    });
    return (
        <BrowserRouter>
            <PagesHeader setUsername={setUsername} username={username} id={id} type={type}/>
            <Routes>
                <Route path={"/main"} element={<MainPage CurrentUsersName={username} Id={id} type={type}/>} />
                <Route path={"/"} element={<Login setUsername={setUsername}/>}/>
                <Route path={"/register"} element={<Register />}/>
                <Route path={"/depo"} element={<Depo/>}/>
                <Route path={"/tracking"} element={<Track username={username} id={id} type={type} />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;