
import React, {useState, useEffect} from "react";
import "./index.css"

const DepoPage = () => {
    const [road, setRoad] = useState("")
    useEffect(()=> {
        (
            async () => {
                const response = await fetch("http://localhost:8080/api/stations", {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const data = await response.json()
                setRoad(data.stations)
            }
        )();
    });
    console.log(road);
    return(
        <div>
            <h1>{road}</h1>
        </div>
    )
};

export default DepoPage;