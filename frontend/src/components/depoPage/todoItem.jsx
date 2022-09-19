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
                    
                  </MDBTableBody>
               
    )
};

export default TodoItem;