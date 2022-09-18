
import React, {useState, useEffect} from "react";
import "./index.css"

import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableHead,
  } from "mdb-react-ui-kit";
import TodoItem from "./todoItem";
import { useState } from "react";



const DepoPage = () => {
    // const [todos, setTodos] = useState([]);

    // const addToDo = (idNum,nameWork,surnameWork) => {
    //     let todo = {id: idNum, name: nameWork, surname: surnameWork, completed: false};
    //     let newTodos = [todo, ...todos]
    //     setTodos(newTodos)
    // }
    
   

    return(
        <div className="todo">
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" xl="7">
              <MDBCard className="rounded-3">
                <MDBCardBody className="p-4">
                  <h4 className="text-center my-3 pb-3">Прибытие работников в ДЕПО</h4>
        <MDBTable className="mb-4">
                  <MDBTableHead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Имя работника:</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </MDBTableHead>
           <TodoItem></TodoItem>
           </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>




export default DepoPage;