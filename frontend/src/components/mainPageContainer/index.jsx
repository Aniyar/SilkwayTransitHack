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
    
    const next = ({}) => {
        if (isDone===true && first == true && second === true){
            navigate("/tracking");
            window.location.reload();
        } else {
          alert("Wait!")
        }
    }

    // const Tracking = ({username,id,type}) =>{
    //   const [road, setRoad] = useState("")
    //   useEffect(()=> {
    //     (
    //       async () => {
    //         const response = await fetch("http://localhost:8080/api/stations", {
    //           headers: {'Content-Type': 'application/json'},
    //           credentials: 'include',
    //         });
    //         const data = await response.json()
    //         setRoad(data.stations)
    //       }
    //     )();
    //   });  
    //   let array = []
    //   if (road !== "") {
    //     let stat = ""
    //     for (let i = 0; i <= road.length; i++ ) {
    //       if (road[i] === "/" || i == road.length) {
    //         array.push(stat)
    //         stat = ""
    //       } else {
    //         stat = stat + road[i]
    //       }
    //     }
    //   }

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
      const response = await fetch("https://localhost:7031/Trip/StartTrip?driverId=" + Id + "&trainid=4567&startstation=Station1&finalstation=Station20&roadid=ALAAST", {
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

        
        <Form.Select aria-label="Default select example">
      <option> Номер вагона</option>
      <option value="1">O123434</option>
      <option value="2">0133493</option>
      <option value="3">0139483</option>
    </Form.Select>

    <Form.Select aria-label="Default select example">
      <option>Станция отбытия</option>
      <option value="1">Алматы-2</option>
      <option value="2">Шымкент</option>
      <option value="3">Кызылорда-1</option>
    </Form.Select>


    <Form.Select aria-label="Default select example">
      <option>Станция назначения</option>
      <option value="1">Алматы-2</option>
      <option value="2">Кызылорда-1</option>
      <option value="3">Шымкент</option>
    </Form.Select>
    

   
        {/* <Dropdown className = "dropDown">
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Номер вагона
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item  id="train001">Train001</Dropdown.Item>
        <Dropdown.Item href="#/action-2" id="train002">Train002</Dropdown.Item>
        <Dropdown.Item href="#/action-3" id="train003">Train003</Dropdown.Item>
        <Dropdown.Item href="#/action-4" id="train004">Train004</Dropdown.Item>
        <Dropdown.Item href="#/action-5" id="train005">Train005</Dropdown.Item>
        <Dropdown.Item href="#/action-6" id="train006">Train006</Dropdown.Item>
        <Dropdown.Item href="#/action-7" id="train007">Train007</Dropdown.Item>
        <Dropdown.Item href="#/action-8" id="train008">Train008</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


    <Dropdown className = "dropDown">
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Станция отбытия
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


    <Dropdown className = "dropDown">
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Станция прибытия
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   */}


        <Button variant="primary" className = "buttonCard" onClick={startTrip}>Отправить запрос</Button>
      </Card.Body>
      </div>
    </Card>
    </div>
    </div>
        <section className="margint">
        <Button variant="secondary" size="lg" onClick={go} id="nextB"> Перейти к маршруту  </Button>
        </section>
    </div>
    )
};

export default MainPageContainer;

