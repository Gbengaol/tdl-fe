import React, { useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import TextInput from "../components/TextInput.component";
import { useForm } from "react-hook-form";
import { resetPasswordEndpoint } from "../utils/apis";
import { errorHandler } from "../utils/errorHandler";
import Swal from "sweetalert2";
import ButtonLoader from "../components/ButtonLoader.component";

const ResetPassword = () => {
  const { register, handleSubmit, errors } = useForm<ManagePasswordData>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    params: { token },
  } = useRouteMatch();
  const history = useHistory();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const result = await resetPasswordEndpoint(data, token);
      if (result.status === 200) {
        setLoading(false);
        Swal.fire(
          "Password changed",
          "You have set a new password. Please log in with your new password.",
          "success"
        );
        history.push("/");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error", errorHandler(error), "error");
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <h1 className="h3 mb-4 mt-5 font-weight-bold text-center">
        Set New Password
      </h1>
      <TextInput
        placeholder="Enter new password"
        type="password"
        name="newPassword"
        autoFocus
        reference={register({ required: true })}
        errors={errors.newPassword}
        margin="my-4"
      />
      <TextInput
        placeholder="Enter new password again"
        type="password"
        name="newPasswordAgain"
        autoFocus
        reference={register({ required: true })}
        errors={errors.newPasswordAgain}
        margin="my-4"
      />
      <button
        className="btn btn-md btn-secondary btn-block"
        type="submit"
        disabled={loading}
      >
        {loading ? <ButtonLoader /> : "Set Password"}
      </button>
      <h6 className="text-center mt-5">
        <Link to="/">Login </Link>
      </h6>
    </form>
  );
};

export default ResetPassword;
