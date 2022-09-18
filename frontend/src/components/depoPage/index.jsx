
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



const DepoPage = () => {
    // const [todos, setTodos] = useState([]);

    // const addToDo = (idNum,nameWork,surnameWork) => {
    //     const todo = {id: idNum, name: nameWork, surname: surnameWork, completed: false};
    //    
    //     setTodos(...todos, todo)
    // }
    // todos.map((todo)
    const [data, setData] = useState();
    const parseUsers = async (e) => {
      e.preventDefault()
      const response = await fetch("https://localhost:7031/PresenseCheck?stationId=001", {
          headers: {'Content-Type': 'string'},
          credentials: 'include'
        })
        const dataf = await response.json()
        setData(dataf)
    }

    const approveUser = async (driverid) => {
      console.log(driverid)
      const response = await fetch("https://localhost:7031/PresenseCheck?driverId="+driverid+"&approved=yes", {
        method: 'POST',  
        headers: {'Content-Type': 'string'},
          credentials: 'include'
        })
        const dataf = await response.json()
        console.log(dataf)
    }
    return(
        <div className="todo">
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" xl="7">
              <MDBCard className="rounded-3">
                <MDBCardBody className="p-4">
                  <h4 className="text-center my-3 pb-3">Прибытие работников в ДЕПО</h4>
                  <button onClick={parseUsers}>Reload</button>
                    <MDBTable className="mb-4">
                  <MDBTableHead>
                  </MDBTableHead>
                 
                      {typeof(data) !== "undefined" ? data.map( (item) => {
                        return (
                          <tr key={item.Name+item.Id}>
                            <th scope="row">{item.Id}</th>
                        <td key={item.Name}>{item.Name+" "+item.Surname}</td>
                        <td key={item.Id}>В прогрессе</td>
                        <td key={item.Surname }>
                          <button variant="danger">
                            Не потверждать
                          </button>
  
                          <button  variant="success" className="ms-1"   onClick={()=>{approveUser(item.Id)}}>
                            Потвердить
                          </button >
                          </td>
                          
                    </tr>
                        )
                      }) : (null)}
                   
                  </MDBTable>
                </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  )
  }


export default DepoPage;