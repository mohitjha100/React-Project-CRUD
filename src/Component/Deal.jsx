import React, { useEffect } from "react";
import { useState } from "react";
import "../Style/Deal.css";
import Form from "./Form";
import "../Style/Deal.css";
import axios from "axios";

const Deal = () => {

  const [tableFormData , setTableFormData] = useState();

  // Form Modal
  const [formModal , setFormModal] = useState(false)

  useEffect(()=>{
    axios.get('http://localhost:4200/TableData').then((res)=>{
      // console.log('res ==>',res.data)
      setTableFormData(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  })

  const closeModal = ()=>{
    setFormModal(false);
  }

  return (
    <>
      <div className="main-deal-container">
        <div className="button-right">
          <button onClick={()=>{setFormModal(true)}}>Add User</button>
        </div>
        <div className="table">
          <table class="responsiveTbl">
            <thead class="tableHead">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Email</th>
                <th>username</th>
              </tr>
            </thead>
            <tbody>
              {tableFormData && tableFormData.map((item,index)=>{
                return(
                  <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      { formModal && <Form closeModal={closeModal}/>}
    </>
  );
};

export default Deal;
