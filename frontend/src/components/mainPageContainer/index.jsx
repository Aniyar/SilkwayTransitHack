import React from "react";
import "./index.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate} from 'react-router-dom';
import { useState } from "react";


const MainPageContainer = ({CurrentUsersName}) => {
    const [isDone, setIsDone]= useState(false); 
    const navigate = useNavigate();
    const next = () => {
        console.log(isDone);
        if (isDone===true){
            navigate("/tracking");
            window.location.reload()
        }
    }
       
    
    const arrived = () => {
        // Если ДЕПО апрувнул прибытие то кнопка меняется 
        const bc = document.getElementById('card1');
       bc.style.backgroundColor = 'green';
       
    }
    const go = () => {
        const bc = document.getElementById('card3');
       bc.style.backgroundColor = 'green';
       setIsDone(true);
       const nextB = document.getElementById("nextB");
       nextB.style.backgroundColor = 'blue';
    }
    
    // ЕСЛИ АПРУВ МЕДОСМОТР ТО     const bc = document.getElementById('card2');
    //    bc.style.backgroundColor = 'green';
    let text;
    // if (typeof(CurrentUsersName) === "string" && CurrentUsersName.length > 0) {
        text = (
            <h2 className="MainPageContainer-upperLarge-h1">Здравствуйте, {CurrentUsersName}! Задания на сегодня:</h2>
        )
    // } else {
    //     text = (
    //         <h2 className="MainPageContainer-upperLarge-h1">Hello dear user!</h2>
    //     )
    // }
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
    {/* </div> */}
    {/* <div className="cardmargin"> */}
   
    <Card style={{ width: '30rem' }}>
    <div className="drop">
      <Card.Body className="card" id="card3">
        <Card.Title>Принятие вагона.</Card.Title>

    

   
        <Dropdown className = "dropDown">
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Номер вагона
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
  


        <Button variant="primary" className = "buttonCard" onClick={go}>Отправить запрос</Button>
      </Card.Body>
      </div>
    </Card>
   
    {/* </div> */}
    </div>
    </div>
        <section className="margint">
        <Button variant="secondary" size="lg" onClick={next} id="nextB"> Перейти к маршруту  </Button>
        </section>
           
       
    </div>
    )
};

export default MainPageContainer;

