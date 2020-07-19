import React, { Fragment, useState, useEffect } from "react";
import {
  getArchivedTodosEndPoint,
  deleteATodoEndPoint,
  unarchiveATodoEndPoint,
} from "../utils/apis";
import { errorHandler } from "../utils/errorHandler";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import TrashIcon from "../img/trash.svg";
import RestoreIcon from "../img/restore.svg";
import TextInput from "../components/TextInput.component";

const Archives: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[] | null>([]);
  const [count, setCount] = useState<number | null>();
  const [size] = useState(10);
  const [page, setPage] = useState<number>(1);
  const [refreshTodos, setRefreshTodos] = useState<boolean | null | number>();
  const history = useHistory();
  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line
  }, [refreshTodos, page]);
  const getAllTodos = async (search?: string | null) => {
    try {
      const result = await getArchivedTodosEndPoint(size, page, search);
      if (result.status === 200) {
        setTodos(result.data.todos);
        setCount(result.data.count);
      }
    } catch (error) {
      if (error.response.status === 401) {
        history.push("/");
      }
      Swal.fire("Error", errorHandler(error), "error");
    }
  };

  const deleteTodoItem = (id: number) => {
    Swal.fire({
      title: "Delete Item",
      text: "Are you sure you want to delete this item?",
      icon: "error",
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
          Swal.fire("Error", errorHandler(error), "error");
        }
      }
    });
  };

  const unarchiveTodoItem = (id: number) => {
    Swal.fire({
      title: "Restore Item",
      text: "Are you sure you want to restore this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const result = await unarchiveATodoEndPoint(id);
          if (result.status === 200) {
            setRefreshTodos(Date.now());
            setPage(1);
            Swal.fire("Restored!", "Your file has been restored.", "success");
          }
        } catch (error) {
          Swal.fire("Error", errorHandler(error), "error");
        }
      }
    });
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Archived Todo Items</h4>
      </div>
      <div>
        <TextInput
          type="search"
          placeholder="Search for an item"
          onChange={(e: any) => {
            getAllTodos(e.target.value);
          }}
        />
      </div>
      <ul className="list-group">
        {todos && todos.length
          ? todos.map((todo, id) => {
              const {
                todo_item,
                description,
                priority,
                status,
                created_at,
                id: todoId,
              } = todo;
              return (
                <li key={id} className="list-group-item">
                  <div className="card">
                    <h6 className="card-header d-flex justify-content-between">
                      <div>
                        {todo_item}
                        <br />
                        <small>
                          {created_at && (
                            <>
                              Created on {created_at.substring(0, 10)} at{" "}
                              {created_at.substring(11, 16)}
                            </>
                          )}
                        </small>
                      </div>
                      <div className="d-flex justify-content-end align-items-center todo-actions">
                        <img
                          onClick={() => unarchiveTodoItem(+todoId)}
                          title="Restore"
                          src={RestoreIcon}
                          alt="restore"
                        />
                        <img
                          onClick={() => deleteTodoItem(+todoId)}
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
          : "No Archived Todo Item"}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            totalSize={count}
            sizePerPage={size}
            changeCurrentPage={(page: number) => setPage(page)}
            numberOfPagesNextToActivePage={1}
            theme="bootstrap"
            currentPage={page}
          />
        </div>
      </ul>
    </Fragment>
  );
};

export default Archives;
