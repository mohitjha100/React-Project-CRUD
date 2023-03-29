import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../Style/Table.css";
import Todo from "./Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";
import NoData from "./NoData";



const Table = () => {

  const [tableData, setTableData] = useState();

  // search Data
  const [searchItem, setSearchItem] = useState("");

  // Edit Data
  const [editItem, setEditItam] = useState(false);
  const [newInputData, setNewInputData] = useState({
    item: "",
    status: "pending",
  });
  const [rowId, setRowId] = useState();
  const [previousData, setPreviousData] = useState();

  // show modal
  const [showModal, setShowModal] = useState(false);

  // Drop Down
  const [dropDown, setDropDown] = useState("All");

  // length of Data
  const [completeTask, setCompleteTask] = useState();
  const [pendingTask, setPendingTask] = useState();

  //CheckBox
  const [checkToggle, setCheckTogggle] = useState();

  // Pagination

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4200/TodoItem")
      .then((res) => {
        setTableData(res.data);
        var pending = res.data?.filter((item) => {
          return item.status === "pending";
        });
        setPendingTask(pending.length);

        var complete = res.data?.filter((item) => {
          return item.status === "completed";
        });
        setCompleteTask(complete.length);
      })
      .catch((err) => {
        console.log(err);
      });
  },[tableData, newInputData]);

  const deletItem = (data) => {
    axios
      .delete("http://localhost:4200/TodoItem/" + data.id)
      .then((res) => {
        console.log("Delete ==>", res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    toast.error("Task Delete", {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };

  const myEdit = (index, item) => {
    setEditItam(true);
    setRowId(index);
    setPreviousData(item);
  };

  const InputValue = (e) => {
    console.log(e.target.name);

    switch (e.target.name) {
      case "item":
        setNewInputData((prev) => ({ ...prev, item: e.target.value }));
        break;
      default:
        break;
    }

    console.log(newInputData);
  };

  const saveItem = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:4200/TodoItem/" + previousData.id, {
        item: newInputData.item ? newInputData.item : previousData.item,
      })
      .then(() => {
        // console.log("res ==>", res.data);
        setEditItam(!editItem);
      })
      .catch((err) => {
        console.log(err);
      });

    toast.success("Edit Successfully", {
      position: "top-center",
      theme: "colored",
    });
  };

  const checkHandle = (id) => {
    // console.log(e.target.checked);
    axios
      .patch("http://localhost:4200/TodoItem/" + id, {
        status: "completed",
      })
      .then((res) => {
      //  console.log("res ===>", res);
        setCheckTogggle(!checkToggle);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <div
        style={{
          width: "98%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          placeholder="Serach Tasks"
          style={{
            width: "30%",
            height: "35px",
            borderRadius: "8px",
            padding: "14px",
          }}
          onChange={(e) => {
            setSearchItem(e.target.value.toLowerCase());
          }}
        />
        <select
          id="cars"
          name="cars"
          onClick={(e) => {
            setDropDown(e.target.value);
          }}
          style={{
            width: "30%",
            height: "35px",
            borderRadius: "8px",
            outline: "none",
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Complete</option>
        </select>
        <button onClick={() => setShowModal(true)}>Add Task</button>
      </div>

      <div className="length-container">
        <h3>Total Task : {tableData?.length}</h3>
        <h3>Incomplete Task : {pendingTask}</h3>
        <h3>Task Complete: {completeTask}</h3>
      </div>
      
      <table class="responsiveTbl">
        <thead class="tableHead">
          <tr>
            <th>ID</th>
            <th>Check</th>
            <th>Task</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData
              .filter((item) => {
                return item.item.toLowerCase().includes(searchItem);
              })
              .filter((item) => {
                if (dropDown === "All") {
                  return item;
                } else if (
                  item.status?.toLowerCase() === dropDown?.toLowerCase()
                )
                  return item;
              })
              .map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {editItem && rowId === index ? (
                          ""
                        ) : (
                          <input
                            type="checkbox"
                            onClick={(e) => {
                              checkHandle(item.id);
                            }}
                            checked={item.status === "completed"}
                            disabled={item.status === "completed"}

                       
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </td>
                      <td className={item.status == "completed" && "strike"}>
                        {editItem && rowId === index ? (
                          <input
                            className="innupt"
                            name="item"
                            defaultValue={item.item}
                            onChange={(e) => {
                              InputValue(e);
                            }}
                          />
                        ) : (
                          item.item
                        )}
                      </td>
                      <td
                        className={
                          item.status === "pending" ? "pending" : "completed"
                        }
                      >
                        {item.status}
                      </td>
                      {editItem && rowId === index ? (
                        <>
                          <td>
                            <i
                              className="fa-solid fa-check check"
                              onClick={(e) => {
                                saveItem(e);
                              }}
                            ></i>
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-xmark"
                              onClick={() => setEditItam(false)}
                            ></i>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <i
                              className="fa-solid fa-pen"
                              onClick={() => myEdit(index, item)}
                            ></i>
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-trash delete"
                              onClick={() => deletItem(item)}
                            ></i>
                          </td>
                        </>
                      )}
                    </tr>
                  </>
                );
              })}
        </tbody>
      </table>
      {/* {console.log(tableData?.length , "mohit")} */}
      {tableData?.length === 0  && <NoData/> } 
      {showModal && <Todo  closeModal={closeModal} />}
      <Pagination/>
      <ToastContainer />
    </>
  );
};
export default Table;
