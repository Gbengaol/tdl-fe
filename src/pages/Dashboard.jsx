import React, { Fragment, useState, useEffect } from "react";
import {
  getAllTodosEndPoint,
  deleteATodoEndPoint,
  archiveATodoEndPoint,
} from "../utils/apis";
import { errorHandler } from "../utils/errorHandler";
import AddTodoModal from "../components/Modals/AddTodoModal.component";
import EditTodoModal from "../components/Modals/EditTodoModal.component";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import EditIcon from "../img/edit.svg";
import TrashIcon from "../img/trash.svg";
import ArchiveIcon from "../img/archive.svg";
import TextInput from "../components/TextInput.component";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState();
  const [size] = useState(10);
  const [page, setPage] = useState(1);
  const [refreshTodos, setRefreshTodos] = useState();
  const [todoToEdit, setTodoToEdit] = useState({});
  const history = useHistory();
  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line
  }, [refreshTodos, page]);
  const getAllTodos = async (search) => {
    try {
      const result = await getAllTodosEndPoint(size, page, search);
      if (result.status === 200) {
        setTodos(result.data.todos);
        setCount(result.data.count);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        history.push("/");
      }
      Swal.fire("Error", errorHandler(error), "danger");
    }
  };

  const deleteTodoItem = (id) => {
    Swal.fire({
      title: "Delete Item",
      text: "Are you sure you want to delete this item?",
      icon: "danger",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const result = await deleteATodoEndPoint(id);
          if (result.status === 204) {
            setRefreshTodos(Date.now());
            setPage(1);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error", errorHandler(error), "danger");
        }
      }
    });
  };

  const archiveTodoItem = (id) => {
    Swal.fire({
      title: "Archive Item",
      text: "Are you sure you want to archive this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const result = await archiveATodoEndPoint(id);
          if (result.status === 200) {
            setRefreshTodos(Date.now());
            setPage(1);
            Swal.fire("Archived!", "Your file has been archived.", "success");
          }
        } catch (error) {
          Swal.fire("Error", errorHandler(error), "danger");
        }
      }
    });
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>List of Todos</h4>
        <Link to="/user/archives">
          <button className="btn btn-secondary">View Archive</button>
        </Link>
        <button
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#addTodoModal"
        >
          Add
        </button>
      </div>
      <div>
        <TextInput
          type="search"
          placeholder="Search for an item"
          onChange={(e) => {
            getAllTodos(e.target.value);
          }}
        />
      </div>
      <ul className="list-group">
        {todos.length
          ? todos.map((todo, id) => {
              const {
                todo_item,
                description,
                priority,
                status,
                created_at,
              } = todo;
              return (
                <li key={id} className="list-group-item">
                  <div className="card">
                    <h6 className="card-header d-flex justify-content-between">
                      <div>
                        {todo_item}
                        <br />
                        <small>
                          Created on{" "}
                          {created_at ? created_at.substring(0, 10) : null} at{" "}
                          {created_at ? created_at.substring(11, 16) : null}
                        </small>
                      </div>
                      <div className="d-flex justify-content-end align-items-center todo-actions">
                        <img
                          title="Edit"
                          data-toggle="modal"
                          data-target="#editTodoModal"
                          onClick={() => {
                            setTodoToEdit(todo);
                          }}
                          src={EditIcon}
                          alt="Edit"
                        />
                        <img
                          onClick={() => archiveTodoItem(todo.id)}
                          title="Archive"
                          src={ArchiveIcon}
                          alt="Archive"
                        />
                        <img
                          onClick={() => deleteTodoItem(todo.id)}
                          title="Delete"
                          src={TrashIcon}
                          alt="Trash"
                        />
                      </div>
                    </h6>
                    <div className="card-body">
                      <p className="text-center font-weight-bold">
                        Priority:{" "}
                        <span className="text-uppercase"> {priority}</span>
                      </p>
                      <p>{description}</p>
                      <p className="text-right">
                        {status ? "Completed" : "Not yet completed"}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })
          : "No Todo Item"}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            totalSize={count}
            sizePerPage={size}
            changeCurrentPage={(page) => setPage(page)}
            numberOfPagesNextToActivePage={1}
            theme="bootstrap"
            currentPage={page}
          />
        </div>
      </ul>
      <AddTodoModal setRefreshTodos={setRefreshTodos} />
      <EditTodoModal
        todoToEdit={todoToEdit}
        setRefreshTodos={setRefreshTodos}
      />
    </Fragment>
  );
};

export default Dashboard;
