import React, {useState, useEffect} from "react";
import "./index.css"

const Tracking = ({username,id,type}) =>{
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
  }
  return (
  <div className="progBar">
    <div class="container padding-bottom-3x mb-1">
        <div class="card mb-3">
          <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Номер поезда - </span><span class="text-medium">34VB5540K83</span></div>
          <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
            <div class="w-100 text-center py-1 px-2" key={username}><span class="text-medium">Имя управляющего поезда:</span> {username} </div>
            <div class="w-100 text-center py-1 px-2"><span class="text-medium">ИИН</span> {id}</div>
          </div>
          <div class="card-body">
            <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">


              <div class="step completed">
                <div class="step-icon-wrap">
                  <div class="step-icon"><i class="pe-7s-cart"></i></div>
                </div>
                <h4 class="step-title">Алматы-2</h4>
              </div>

              <div class="step completed">
                <div class="step-icon-wrap">
                  <div class="step-icon"><i class="pe-7s-config"></i></div>
                </div>
                <h4 class="step-title">Алматы-1</h4>
              </div>
              <div class="step completed">
                <div class="step-icon-wrap">
                  <div class="step-icon"><i class="pe-7s-medal"></i></div>
                </div>
                <h4 class="step-title">Тараз</h4>
              </div>
              <div class="step">
                <div class="step-icon-wrap">
                  <div class="step-icon"><i class="pe-7s-car"></i></div>
                </div>
                <h4 class="step-title">Шымкент-2</h4>
              </div>
              <div class="step">
                <div class="step-icon-wrap">
                  <div class="step-icon"><i class="pe-7s-home"></i></div>
                </div>
                <h4 class="step-title">Кызылорда</h4>
              </div>
              

              {array.map((item) => 
                <div class="step completed">
                  <div onClick={() => console.log("Qwe")} class="step-icon-wrap">
                    <div class="step-icon"><i class="pe-7s-config"></i></div>
                  </div>
                <h4 class="step-title">{item}</h4>
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


         