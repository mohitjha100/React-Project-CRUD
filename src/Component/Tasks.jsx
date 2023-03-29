import React from "react";
import "../Style/Task.css";
import Table from "./Table";

const Tasks = () => {
  return (
    <>
      <div className="Todo-list-container">
        <div className="todo-add-nav">
        </div>
        <Table/>
      </div>
    </>
  );
};

export default Tasks;
