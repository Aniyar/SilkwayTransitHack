
import React, {useState, useEffect} from "react";
import "./index.css"

const DepoPage = () => {

    const [stations, setStation] = useState("")
    const ParsingChatHistory = async () => {
        const response = await fetch("http://localhost:8080/api/stations");
        const data = await response.json()
        setStation(data)
        console.log(stations);
    }
    console.log(stations);

    return(
        <div>
            <button onClick={ParsingChatHistory}>HEHQWHEWQHEHQ</button>
            <h1>qweqwe</h1>
            
            <button onClick={ParsingChatHistory}>HEHQWHEWQHEHQ</button>
            
            <button onClick={ParsingChatHistory}>HEHQWHEWQHEHQ</button>S
        </div>
    )
};

export default DepoPage;