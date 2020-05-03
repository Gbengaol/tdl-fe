import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextInput from "../components/TextInput.component";
import { useForm } from "react-hook-form";
import { loginEndpoint } from "../utils/apis";
import { errorHandler } from "../utils/errorHandler";
import Swal from "sweetalert2";
import ButtonLoader from "../components/ButtonLoader.component";

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await loginEndpoint(data);
      if (result.status === 200) {
        localStorage.setItem(
          "todoListStorage",
          JSON.stringify({
            token: result.data.token,
            first_name: result.data.user.first_name,
          })
        );
        setLoading(false);
        history.push("/user");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error", errorHandler(error), "danger");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-4 font-weight-bold text-center">Please sign in</h1>
      <TextInput
        placeholder="Email Address"
        type="email"
        name="email"
        autoFocus
        reference={register({ required: true })}
        errors={errors.email}
        margin="my-4"
      />
      <TextInput
        placeholder="Password"
        type="password"
        name="password"
        margin="my-4"
        reference={register({ required: true, minLength: 2 })}
        errors={errors.password}
      />
      <button
        className="btn btn-md btn-secondary btn-block"
        type="submit"
        disabled={loading}
      >
        {loading ? <ButtonLoader /> : "Sign in"}
      </button>
      <h6 className="text-center mt-5">
        Forgot your password? <Link to="/forgot-password">Reset it </Link>
      </h6>
    </form>
  );
};

export default Login;
