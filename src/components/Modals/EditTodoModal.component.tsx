import React, { useRef, useState, useEffect } from "react";
import TextInput from "../TextInput.component";
import SelectDropdown from "../SelectDropdown.component";
import { useForm } from "react-hook-form";
import { editATodoEndPoint } from "../../utils/apis";
import { errorHandler } from "../../utils/errorHandler";
import Swal from "sweetalert2";

interface Props {
  todoToEdit: TodoProps;
  setRefreshTodos: any;
}

const EditTodoModal: React.FC<Props> = ({ todoToEdit, setRefreshTodos }) => {
  const { register, handleSubmit, errors } = useForm<TodoProps>();
  const dismissButton = useRef<HTMLButtonElement>(null);
  const [todoItem, setTodoItem] = useState<TodoProps>();
  useEffect(() => {
    setTodoItem(todoToEdit);
  }, [todoToEdit]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await editATodoEndPoint(data, todoItem && todoItem.id);
      if (result.status === 200) {
        setRefreshTodos(Date.now());
        if (dismissButton.current) {
          dismissButton.current.click();
        }
      }
    } catch (error) {
      Swal.fire("Error", errorHandler(error), "error");
    }
  });
  return (
    <div
      className="modal fade"
      id="editTodoModal"
      tabIndex={-1}
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
            <form onSubmit={onSubmit}>
              <TextInput
                placeholder="Name of todo item"
                type="text"
                name="todo_item"
                value={todoItem && todoItem.todo_item}
                reference={register({ required: true })}
                errors={errors.todo_item}
                autoFocus
              />
              <SelectDropdown
                placeholder="Priority"
                name="priority"
                value={todoItem && todoItem.priority}
                reference={register({ required: true })}
                errors={errors.priority}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </SelectDropdown>
              <textarea
                className="form-control mb-3"
                rows={3}
                name="description"
                ref={register}
                defaultValue={todoItem && todoItem.description}
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
