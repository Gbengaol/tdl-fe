import React, { useRef } from "react";
import TextInput from "../TextInput.component";
import SelectDropdown from "../SelectDropdown.component";
import { useForm } from "react-hook-form";
import { addATodoEndPoint } from "../../utils/apis";
import { errorHandler } from "../../utils/errorHandler";
import Swal from "sweetalert2";

const AddTodoModal = ({ setRefreshTodos }) => {
  const { register, handleSubmit, errors } = useForm();
  const dismissButton = useRef();
  const onSubmit = async (data) => {
    try {
      const result = await addATodoEndPoint(data);
      if (result.status === 201) {
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
      id="addTodoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addTodoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addTodoModalLabel">
              Add Todo
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
                reference={register({ required: true })}
                errors={errors.todo_item}
                autoFocus
              />
              <SelectDropdown
                placeholder="Priority"
                name="priority"
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

export default AddTodoModal;
