
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
    const [data, setData] = useState();
    const [driverApproves, setDriverApproves] = useState();
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
      const response = await fetch("https://localhost:7031/PresenseCheck?driverId="+driverid+"&approved=yes", {
        method: 'POST',  
        headers: {'Content-Type': 'string'},
          credentials: 'include'
        })
        const dataf = await response.json()
        console.log(dataf);        
      window.location.reload()
    }

    const approveDriver =  async (tripId,stationId) => {
      const response = await fetch("http://localhost:8080/api/stationApprove", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              "tripId": tripId,
              "depoApprove":"yes",
              "stationId":stationId
          })
      });
      const data = await response.json()
      console.log(data);
      window.location.reload()
    }

    const showDriverApproves = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:8080/api/stationApprove", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "tripId":"toParseTripstations",
            "depoApprove":"no"
          })
        });
        const data = await response.json()
        console.log(data);
        setDriverApproves(data)
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
                      <tbody>
                      <tr>                 
                      {(typeof(data) !== "undefined" && data !== "null") ? (data.map((item) => { 
                         return (
                           <>
                           
                            <td key={item.Name}>{item.Name+" "+item.Surname}</td>
                             <td key={item.Name}>{item.Name+" "+item.Surname}</td>
                             <td key={item.Id}>В прогрессе</td>
                             <td key={item.Surname}></td>
                             <button variant="danger">
                               Не потверждать
                             </button>
                             <button  variant="success" className="ms-1"onClick={()=>{approveUser(item.Id)}}>
                               Потвердить
                             </button >
                            </>
                          )
                      })) : (<p>No drivers in Depo</p>)}
                     </tr>
                     </tbody>
                  </MDBTable>
                  <h4 className="text-center my-3 pb-3">Approve Drivers</h4>
                  <button onClick={showDriverApproves}>Reload</button>
                    <MDBTable className="mb-4">
                    <MDBTableHead>
                      </MDBTableHead>
                      <tbody>
                      {(typeof(driverApproves) !== "undefined" && driverApproves !== "null") ? driverApproves.map((item) => {
                        return (
                          <tr key={item.stationId+item.tripId}>
                            <td key={item.tripId} id={item.tripId}>{item.tripId}</td>
                            <td key={item.gas}>{item.gas}</td>
                            <td key={item.weight}>{item.weight}</td>
                            <td key={item.stationId }>{item.stationId}</td>
                            <td key={item.distance }>{item.distance}</td>
                            <td key={item.tripId+item.stationId}>
                              <button key={item.tripId} variant="danger">
                                Не потверждать
                              </button>
                              <button key={item.stationId} variant="success" className="ms-1"   onClick={()=>{approveDriver(item.tripId, item.stationId)}}>
                                Потвердить
                              </button > 
                            </td> 
                          </tr>
                        )
                      }) : (<p>No drivers to approve</p>)}
                    </tbody>
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