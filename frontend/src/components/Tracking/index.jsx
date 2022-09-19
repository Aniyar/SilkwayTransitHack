import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./index.css"

const Tracking = ({username,id,type}) =>{
  const navigate = useNavigate();
  const [roadid, setRoadid] = useState("");
  const [road, setRoad] = useState("")
  const [stationid, setStationid] = useState("");
  const [approved, setApproved] = useState("");
  const [key2, setKey2] = useState(0);
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
  
  window.setInterval( async function(){
    let i = 0;
    const response = await fetch("http://localhost:8080/api/trips", {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const data = await response.json()
        console.log(data);
        for (let j = 0; j < data.length; j++) {
          if (data[j].depoApprove === "yes") {
            i = i + 1
          }
        }
    setKey2(i)
  }, 10000);

  useEffect(()=> {
    (
      async () => {
        let i = 0;
        const response = await fetch("http://localhost:8080/api/trips", {
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
            });
            const data = await response.json()
            console.log(data);
            for (let j = 0; j < data.length; j++) {
              if (data[j].depoApprove === "yes") {
                i = i + 1
              }
            }
        setKey2(i)
      }
  )();
  })

  const changeStatus =  async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/stationApprove", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "tripId":roadid,
            "arrivalTime":document.getElementById("q4").value,
            "weight":document.getElementById("q2").value,
            "gas":document.getElementById("q1").value,
            "distance":document.getElementById("q3").value,
            "depoApprove":"no",
            "stationId":array[key]
        })
    });
    const data = await response.json()
    console.log(data);
    window.location.reload()
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
                  (i >= key2 
                    ? 
                    <div class="step">
                  <div onClick={() => console.log("Qwe")} class="step-icon-wrap">
                    <div class="step-icon"><i class="pe-7s-config"></i></div>
                  </div>
                <h4 class="step-title">{item}</h4>
                {console.log(key2)}
                {key2 === i ? <form>
                  <input id="q1" className="form-control" placeholder="gas" type="text" />
                  <input  id="q2" className="form-control" placeholder="weight" type="text" />
                  <input id="q3" className="form-control" placeholder="distance" type="text"/>
                  <input id="q4" className="form-control" placeholder="Arrival Time" type="text" />
                  <button className="btn btn-outline-dark" onClick={(e)=>changeStatus(e)}> Approve</button>
                </form> :  null}
              </div>
              :
              <div class="step completed  ">
                  <div onClick={() => console.log("Qwe")} class="step-icon-wrap">
                    <div class="step-icon"><i class="pe-7s-config"></i></div>
                  </div>
                <h4 class="step-title">{item}</h4>
                {key === i ? <form>
                  <input id="q1" className="form-control" placeholder="gas" type="text" />
                  <input id="q2" className="form-control" placeholder="weight" type="text" />
                  <input id="q3" className="form-control" placeholder="distance" type="text"/>
                  <input id="q4" className="form-control" placeholder="Arrival Time" type="text"/>
                  <button className="btn btn-outline-dark" onClick={(e)=>changeStatus(e)}> Approve</button>
                </form> :  null}
              </div>)
                
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


         