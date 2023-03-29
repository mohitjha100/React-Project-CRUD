import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const formInitialData = {
  name: "",
  gender: "",
  contact: "",
  email: "",
  username: "",
  password: "",
};
const zxcvbn = require("zxcvbn");

const Form = ({ closeModal }) => {
  const [formData, setFormData] = useState(formInitialData);
  // Password Here
  const [showPassword, setShowPassword] = useState(false);
  const [score,setScore] = useState("null");

  const inputData = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "name":
        setFormData((prev) => ({ ...prev, name: e.target.value }));
        break;
      case "gender":
        setFormData((prev) => ({ ...prev, gender: e.target.value }));
        break;
      case "contact":
        setFormData((prev) => ({ ...prev, contact: e.target.value }));
        break;
      case "email":
        setFormData((prev) => ({ ...prev, email: e.target.value }));
        break;
      case "username":
        setFormData((prev) => ({ ...prev, username: e.target.value }));
        break;
      case "password":
        setFormData((prev) => ({ ...prev, password: e.target.value }));
        break;
      default:
        break;
    }
  };

  const submitForm = (e) => {
    if (!formData.name) {
      toast.warning("Pls Fill Name", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } else if (!formData.gender) {
      toast.warning("Pls Fill Name Gender", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } else if (!formData.contact) {
      toast.warning("Pls Fill Name Contact", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } else if (!formData.email) {
      toast.warning("Pls Fill Email", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } else if (!formData.username) {
      toast.warning("Pls Fill userName", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    }else if(!formData.password){
      toast.warning("Pls Fill PassWord", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } else {
      e.preventDefault();
      axios
        .post("http://localhost:4200/TableData", formData)
        .then((res) => {
          console.log("Res ==>,", res)
          closeModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
      toast.success("Added Successfully", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  });

  const toggleIcon = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const passwordType = (e)=>{
    console.log(e.target.value);
    let pass = zxcvbn(e.target.value);

    if(e.target.value !== ""){
      setScore(pass.score)
    }else{
      setScore("null")
    }
    console.log(pass)
  }

  return (
    <>
      <div className="main-modal-wrapper"></div>
      <div className="modal-container">
        <form style={{ height: "610px" }}>
          <h2>Add Information</h2>
          <p>
            Name :
            <div>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                required
                inputData={inputData}
              />
            </div>
          </p>
          <p>
            Gender :
            <div>
              <Input
                type="text"
                placeholder="Male"
                name="gender"
                required
                inputData={inputData}
              />
            </div>
          </p>

          {/* <p>
          Gender :  <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="male"
              name="status"
            
              style={{ width: "18px", marginRight: "18px", verticalAlign: "middle",cursor:"pointer" }}
            />

            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="female"
              name="status"
            
              style={{ width: "18px", padding: 0, verticalAlign: "middle",cursor:"pointer" }}
            /> */}
          {/* </p> */}
          <p>
            Contact Number :
            <div>
              <Input
                type="number"
                placeholder="8852-6792-6589"
                required
                name="contact"
                inputData={inputData}
              />
            </div>
          </p>
          <p>
            Email :
            <div>
              <Input
                type="email"
                placeholder="user@gmail.com"
                required
                name="email"
                inputData={inputData}
              />
            </div>
          </p>
          <p>
            User Name :
            <div>
              <Input
                type="text"
                placeholder="Jagdesh562"
                name="username"
                required
                inputData={inputData}
              />
            </div>
          </p>
          <p>
            Password :
            <div style={{ backgroundColor: "#ccc", display: "flex" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                onChange={(e)=>{passwordType(e)}}
                // inputData={inputData}
                style={{ width: "90%" }}
              />
              <button
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  boxShadow: "none",
                }}
                onClick={(e) => {
                  toggleIcon(e);
                }}
              >
                {showPassword ? (
                  <i class="fa-regular fa-eye"></i>
                ) : (
                  <i class="fa-regular fa-eye-slash"></i>
                )}
              </button>
            </div>
            <div className="strength-password" data-score={score}/>
          </p>
          <div className="button">
            <button
              type="submit"
              onClick={(e) => {
                submitForm(e);
              }}
              style={{ backgroundColor: "green" }}
            >
              Add
            </button>
            <button
              onClick={closeModal}
              style={{ marginLeft: "8px", backgroundColor: "red" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Form;
