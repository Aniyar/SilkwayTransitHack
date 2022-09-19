import React from "react";
import "./index.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import Form from 'react-bootstrap/Form';

const MainPageContainer = ({CurrentUsersName,Id,type}) => {
  
  console.log(Id, CurrentUsersName)
    const [isDone, setIsDone]= useState(false); 
    const navigate = useNavigate();
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [stationId, setStationId] = useState("");

    const [trainNum, setTrainNum] = useState("");
    const [startStation, setStartStation] = useState("");
    const [finalStation, setFinalStation] = useState("");
    const [roadId, setRoadId] = useState("");
    
    const next = ({}) => {
        if (isDone===true && first == true && second === true){
            navigate("/tracking");
            window.location.reload();
        } else {
          alert("Wait!")
        }
    }

    const arrived = async(e) => { 
      e.preventDefault();
      const response = await fetch("https://localhost:7031/PresenseDriver?driverId=" + Id +  "&stationId="+stationId, {
        method: 'POST',
        headers: {'Content-Type': 'string'},
        credentials: 'include'
      })
      
    const data = await response.json()
    console.log(data)
    navigate("/main");  

      const bc = document.getElementById('card1');
      
        bc.style.backgroundColor = 'yellow';
        setFirst(true)
        setTimeout(() => {
          bc.style.backgroundColor = 'green';
        }, 3000);
    }

    const startTrip = async(e) => { 
      e.preventDefault();
      const response = await fetch("https://localhost:7031/Trip/StartTrip?driverId=" + Id +
                                   "&trainid=" + trainNum + "&startstation=" + startStation + 
                                   "&finalstation=" + finalStation + "&roadid=" + roadId, 
      {
        method: 'POST',
        headers: {'Content-Type': 'string'},
        credentials: 'include'
      })
      
    const data = await response.json()
    console.log(data)
    navigate("/main");  

      const bc = document.getElementById('card3');
      
        bc.style.backgroundColor = 'yellow';
        setFirst(true)
      // } else {
      //   bc.style.backgroundColor = 'white';
      //   setFirst(false)
      // }
    }

    const go = () => {
      const bc = document.getElementById('card3');
      const nextB = document.getElementById("nextB");
      console.log(first, second);
      if (first === true && second === false) {
        bc.style.backgroundColor = 'green';
        setIsDone(true);
        setSecond(true)
        setFirst(true)
        nextB.style.backgroundColor = 'blue'; 
      } else if (first === false && second === false) {
        alert("Wait!")
      } else { 
        bc.style.backgroundColor = 'white';
        setSecond(false);
        setIsDone(false);
        nextB.style.backgroundColor = 'white'; 
      } 
    }
    
    // ЕСЛИ АПРУВ МЕДОСМОТР ТО     const bc = document.getElementById('card2');
    //    bc.style.backgroundColor = 'green';
    let text;
    // if (typeof(CurrentUsersName) === "string" && CurrentUsersName.length > 0) {
        text = (
            <h2 className="MainPageContainer-upperLarge-h1">Здравствуйте, {CurrentUsersName}! Задания на сегодня:</h2>
        )
    return (
        <div className="MainPageContainer">
             {text}
            <div className="MainPageContainer-upperLarge">
           
                
                <div className="CardContainer">
                    {/* <div className="cardmargin"> */}
            <Card style={{ width: '30rem' }}>
      <Card.Body className="card" id="card1">
        <Card.Title>Вы прибыли в депо?</Card.Title>
        <Card.Text>
          Отправьте запрос о прибытие в депо. Затем, дождитесь подверждения о вашем прибытие в депо.
        </Card.Text>
        <input onChange={(e) => setStationId(e.target.value)} />
        <Button variant="primary" className = "buttonCard" onClick={arrived}>Прибыл в депо.</Button>
  
      </Card.Body>
    </Card>
    <Card style={{ width: '30rem' }}>
      <Card.Body className="card" id="card2">
        <Card.Title>Прохождение медосвидетельства.</Card.Title>
        <Card.Text>
          После того, как ваш запрос о прибытие потвержден. Запрос об успешном прохождении медосмотра отправляется автоматически. Ожидайте потверждение.
        </Card.Text>
        <Button variant="basic" className = "buttonCard" disabled="disabled">Запрос будет отправлен автоматически.</Button>
       
        
        
      </Card.Body>
    </Card>
    <Card style={{ width: '30rem' }}>
    <div className="drop">
      <Card.Body className="card" id="card3">
        <Card.Title>Принятие вагона.</Card.Title>

        <label>Номер поезда</label>
        <input onChange={e => setTrainNum(e.target.value)}></input>
        <label >Дорога</label>
        <input onChange={e => setRoadId(e.target.value)}></input>
        <label>Станция отправления</label>
        <input onChange={e => setStartStation(e.target.value)}></input>
        <label >Станция назначения</label>
        <input onChange={e => setFinalStation(e.target.value)}></input>

        <Button variant="primary" className = "buttonCard" onClick={startTrip}>Отправить запрос</Button>
      </Card.Body>
      </div>
    </Card>
    </div>
    </div>
        <section className="margint">
        <Button variant="secondary" size="lg" onClick={()=>(navigate("/tracking"))} id="nextB"> Перейти к маршруту  </Button>
        </section>
    </div>
    )
};

export default MainPageContainer;

