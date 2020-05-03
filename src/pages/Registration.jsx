import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextInput from "../components/TextInput.component";
import SelectDropdown from "../components/SelectDropdown.component";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { errorHandler } from "../utils/errorHandler";
import { registrationEndpoint } from "../utils/apis";
import ButtonLoader from "../components/ButtonLoader.component";

const Registration = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await registrationEndpoint(data);
      if (result.status === 201) {
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
      <h1 className="h3 mb-3 font-weight-bold text-center">
        Please fill in your details
      </h1>
      <TextInput
        placeholder="Email Address"
        autoFocus
        type="email"
        reference={register({ required: true })}
        errors={errors.email}
        name="email"
      />
      <TextInput
        placeholder="First Name "
        type="text"
        reference={register({ required: true })}
        errors={errors.first_name}
        name="first_name"
      />
      <TextInput
        placeholder="Last Name"
        type="text"
        reference={register({ required: true })}
        errors={errors.last_name}
        name="last_name"
      />
      <TextInput
        placeholder="Middle Name"
        type="text"
        reference={register}
        errors={errors.middle_name}
        name="middle_name"
      />
      <SelectDropdown
        placeholder="Gender"
        name="gender"
        reference={register({ required: true })}
        errors={errors.gender}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </SelectDropdown>
      <TextInput
        placeholder="Password"
        type="password"
        reference={register({ required: true })}
        errors={errors.password}
        name="password"
      />
      <TextInput
        placeholder="Password Again"
        type="password"
        reference={register({ required: true })}
        errors={errors.passwordAgain}
        name="passwordAgain"
      />
      <button
        className="btn btn-md btn-secondary btn-block"
        type="submit"
        disabled={loading}
      >
        {loading ? <ButtonLoader /> : "Register"}
      </button>
      <h6 className="text-center mt-5">
        Do you have an account already? <Link to="/login">Login</Link>
      </h6>
    </form>
  );
};

export default Registration;
