import React from "react";
import "../Style/Todo.css";
import Input from "./Input";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const dataItem = {
    item : "",
    status : "pending"
}


const Todo = ({closeModal}) => {
    const [todoItem,setTodoItem] = useState(dataItem);
    // const [inputCheck, setInputCheck] = useState(true);

    useEffect(()=>{
      document.body.style.overflowY = "hidden";
      return()=>{
        document.body.style.overflowY=  "scroll";
      }
    },[]);

    const inputData = (e)=>{
        console.log(e.target.name)
    
        switch(e.target.name){
            case "item" : 
            setTodoItem((prev)=>({...prev, item:e.target.value}));
            // setInputCheck(true)
            break;
            case "status" : 
            setTodoItem((prev)=>({...prev, status:e.target.value}));
            break
        }
    }

    const submitItem = (e) =>{
      if(!todoItem.item){
        alert('Fill Data');
        }else{
          e.preventDefault();
          axios.post('http://localhost:4200/TodoItem',todoItem).then((res)=>{
              console.log('Res ==>,', res)
              closeModal(false)
          }).catch((err)=>{
              console.log(err)
          })
      
          toast.success("Added Successfully",{
            position :"top-center",
          });
        }
    
      }

  return (
    <>
    <div className="main-modal-wrapper" onClick={closeModal}></div>
    <div className="modal-container">
    <form>
        <h2>Todo List</h2>
        <p>
          Task Name :
          <div>
              <Input type="text" placeholder="Add Item" name="item" inputData={inputData}/>
          </div>
        </p>
        <p>
          Status :  <label htmlFor="male">Pending</label>
            <input
              type="radio"
              id="male"
              name="status"
              inputData={inputData}
              style={{ width: "18px", marginRight: "18px", verticalAlign: "middle",cursor:"pointer" }}
            />

            <label htmlFor="female">Complete</label>
            <input
              type="radio"
              id="female"
              name="status"
              inputData={inputData}
              style={{ width: "18px", padding: 0, verticalAlign: "middle",cursor:"pointer" }}
            />
        </p>
        <div className="button">
            <button type="submit" onClick={(e)=>{submitItem(e)}} style={{backgroundColor:"green"}}>Add</button>
            <button className="buttoon" style={{marginLeft:"8px", backgroundColor:"red"}} onClick={closeModal}>Cancel</button>
        </div>      
        </form>
    </div>

    <ToastContainer/>
    </>
  );
};

export default Todo;
