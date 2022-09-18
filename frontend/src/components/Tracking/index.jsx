import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./index.css"

const Tracking = ({username,id,type}) =>{
  const navigate = useNavigate();
  const [roadid, setRoadid] = useState("");
  const [road, setRoad] = useState("")
  const [stationid, setStationid] = useState("");
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [gas, setGas] = useState("");
  const [arrivaltime, setArrivaltime] = useState("");

  let key = 0
  let array = []
  if (road !== "") {
    let stat = ""
    for (let i = 0; i <= road.length; i++ ) {
      if (road[i] === "/" || i == road.length) {
        array.push(stat)
        stat = ""
      } else {
        stat = stat + road[i]
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] === stationid) {
        key = i+1
        break;
      }
    }
  }
  useEffect(()=> {
    (
      async () => {
        const response = await fetch("http://localhost:8080/api/stations", {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const data = await response.json()
        setRoad(data.stations)
        setRoadid(data.roadId)
      }
    )();
    (
      async () => {
        const response = await fetch("http://localhost:8080/api/trips", {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const data = await response.json()
        for (let j = 0; j < data.length; j++) {
          if (data[j].tripId === roadid) {
            setStationid(data[j].stationId)
          }
        }
      }
    )();
  });  
  console.log(key, array);

  const changeStatus =  async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/stationApprove", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "tripId":roadid,
            "arrivalTime":arrivaltime,
            "weight":weight,
            "gas":gas,
            "distance":distance,
            "depoApprove":"no",
            "stationId":array[key]
        })
    });
    const data = await response.json()
    window.location.reload()
    console.log(data);
}
  return (
  <div className="progBar">
    <div class="container padding-bottom-3x mb-1">
        <div class="card mb-3">
          <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Номер поездаки - </span><span class="text-medium">{roadid}</span></div>
          <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
            <div class="w-100 text-center py-1 px-2" key={username}><span class="text-medium">Имя управляющего поезда:</span> {username} </div>
            <div class="w-100 text-center py-1 px-2"><span class="text-medium">ИИН</span> {id}</div>
          </div>
          <div class="card-body">
            <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
              {array.map((item, i) => 
                <div class="step completed">
                  <div onClick={() => console.log("Qwe")} class="step-icon-wrap">
                    <div class="step-icon"><i class="pe-7s-config"></i></div>
                  </div>
                <h4 class="step-title">{item}</h4>
                {key === i ? <form>
                  <input placeholder="gas" type="text" onChange={e => setGas(e.target.value)} />
                  <input placeholder="weight" type="text" onChange={e => setWeight(e.target.value)} />
                  <input placeholder="distance" type="text" onChange={e => setDistance(e.target.value)} />
                  <input placeholder="Arrival Time" type="text" onChange={e => setArrivaltime(e.target.value)} />
                  <button onClick={(e)=>changeStatus(e)}> Approve</button>
                </form> :  null}
              </div>
              )}
            </div>
          </div>
        </div>
        <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
          <div class="custom-control custom-checkbox mr-3">
        </div>
      </div>
      </div>
      </div>
)
};

export default Tracking;


         