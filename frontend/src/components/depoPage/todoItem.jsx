import React from 'react'
import Button from 'react-bootstrap/Button';
import {
    
    MDBTableBody,
  } from "mdb-react-ui-kit";
  import "./index.css"

const TodoItem = () => {
    return (
       
                  <MDBTableBody>
                    <tr>
                      <th scope="row">1023982</th>
                      <td>Бауыржан Рахимович</td>
                      <td>В прогрессе</td>
                      <td>
                        <Button variant="danger"  onClick={()=>{}}>
                          Не потверждать
                        </Button>

                        <Button  variant="success" className="ms-1" onClick={()=>{}}>
                          Потвердить
                        </Button >
                        </td>
                    </tr>
                   
                  </MDBTableBody>
               
    )
};

export default TodoItem;