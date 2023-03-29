import React from "react";
import "../Style/Color.css";
import "../Style/Content.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import {Provider} from "react-redux";

import Dashboard from "./Dashboard"
import Tasks from "./Tasks";
import Email from "./Email";
import Contact from "./Contact";
import Chat from "./Chat";
import Deal from "./Deal";



const Content = () => {
  return (

    <BrowserRouter>
      <div className="content-box-wrapper">
        <Sidebar />
        <Header />
      </div>

      <div className="Pages-here">
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
          <Route path="/" element={<Tasks/>}></Route>
          <Route path="/Email" element={<Email/>}></Route>
          <Route path="/Contact" element={<Contact/>}></Route>
          <Route path="/Chat" element={<Chat/>}></Route>
          <Route path="/Deal" element={<Deal/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default Content;
