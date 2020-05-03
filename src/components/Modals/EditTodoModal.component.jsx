import React, { useRef, useState, useEffect } from "react";
import TextInput from "../TextInput.component";
import SelectDropdown from "../SelectDropdown.component";
import { useForm } from "react-hook-form";
import { editATodoEndPoint } from "../../utils/apis";
import { errorHandler } from "../../utils/errorHandler";
import Swal from "sweetalert2";

const EditTodoModal = ({ todoToEdit, setRefreshTodos }) => {
  const { register, handleSubmit, errors } = useForm();
  const dismissButton = useRef();
  const [todoItem, setTodoItem] = useState({});
  useEffect(() => {
    setTodoItem(todoToEdit);
  }, [todoToEdit]);
  const onSubmit = async (data) => {
    try {
      const result = await editATodoEndPoint(data, todoItem.id);
      if (result.status === 200) {
        setRefreshTodos(Date.now());
        dismissButton.current.click();
      }
    } catch (error) {
      Swal.fire("Error", errorHandler(error), "danger");
    }
  };
  return (
    <div
      className="modal fade"
      id="editTodoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editTodoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editTodoModalLabel">
              Edit Todo
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              ref={dismissButton}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                placeholder="Name of todo item"
                type="text"
                name="todo_item"
                value={todoItem.todo_item}
                reference={register({ required: true })}
                errors={errors.todo_item}
                autoFocus
              />
              <SelectDropdown
                placeholder="Priority"
                name="priority"
                value={todoItem.priority}
                reference={register({ required: true })}
                errors={errors.priority}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </SelectDropdown>
              <textarea
                className="form-control mb-3"
                rows="3"
                name="description"
                ref={register}
                defaultValue={todoItem.description}
                errors={errors.description}
                placeholder="Enter a brief description"
              ></textarea>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
