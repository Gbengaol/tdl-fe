import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput.component";
import Swal from "sweetalert2";
import { errorHandler } from "../utils/errorHandler";
import { useHistory } from "react-router-dom";
import ButtonLoader from "../components/ButtonLoader.component";

const ManageProfile = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        Swal.fire(
          "Success",
          "Password changed successfully! Please log in again with your new password.",
          "success"
        );
        setLoading(false);
        history.push("/");
      }, 2000);
    } catch (error) {
      Swal.fire("Error", errorHandler(error), "error");
      setLoading(false);
    }
  });
  return (
    <Fragment>
      <h4>Change your password</h4>
      <form onSubmit={onSubmit}>
        <TextInput
          placeholder="Enter current password"
          type="password"
          name="oldPassword"
          required
          reference={register({ required: true })}
          errors={errors.oldPassword}
        />
        <TextInput
          placeholder="Enter new password"
          type="password"
          name="newPassword"
          required
          reference={register({ required: true })}
          errors={errors.newPassword}
        />
        <TextInput
          placeholder="Enter new password again"
          type="password"
          name="newPasswordAgain"
          required
          reference={register({ required: true })}
          errors={errors.newPasswordAgain}
        />
        <button
          className="btn btn-md btn-secondary btn-block"
          type="submit"
          disabled={loading}
        >
          {loading ? <ButtonLoader /> : "Change Password"}
        </button>
      </form>
    </Fragment>
  );
};

export default ManageProfile;
