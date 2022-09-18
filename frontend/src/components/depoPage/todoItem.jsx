import React from 'react'
import Button from 'react-bootstrap/Button';
import {
    
    MDBTableBody,
  } from "mdb-react-ui-kit";
  import "./index.css"

const TodoItem = ({data}) => {
  console.log(data);
  if (data === "undefined") {
    return (null)
  }
    return (
       
                  <MDBTableBody>
                    <tr>
                      {data.map( (item) => {
                        return (
                          <><th scope="row">1023982</th>
                        <td>{data.Name+" "+data.Surname}</td>
                        <td>В прогрессе</td>
                        <td>
                          <Button variant="danger"  onClick={()=>{}}>
                            Не потверждать
                          </Button>
  
                          <Button  variant="success" className="ms-1" onClick={()=>{}}>
                            Потвердить
                          </Button >
                          </td>
                          </>
                        )
                      }) }
                    </tr>
                   
                  </MDBTableBody>
               
    )
};

export default TodoItem;