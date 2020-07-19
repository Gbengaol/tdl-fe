import React, { Fragment, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { errorHandler } from "../utils/errorHandler";
import {
  getProfileEndpoint,
  updateProfileEndpoint,
  updateProfilePictureEndpoint,
} from "../utils/apis";
import TextInput from "../components/TextInput.component";
import SelectDropdown from "../components/SelectDropdown.component";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import DummyPhoto from "../img/profile-image.svg";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState();
  const [profilePictureChanged, setProfilePictureChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const profilePictureRef = useRef();
  const { register, handleSubmit, errors } = useForm();
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await updateProfileEndpoint(data);
      if (result.status === 200) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        setLoading(false);
        history.push("/user");
      }
    } catch (error) {
      Swal.fire("Error", errorHandler(error), "error");
      setLoading(false);
    }
  };
  const getProfile = async () => {
    try {
      const result = await getProfileEndpoint();
      if (result.status === 200) {
        setProfile(result.data.user);
        setProfilePicture(result.data.user.profile_picture);
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        history.push("/");
      }
      Swal.fire("Error", errorHandler(error), "error");
      setLoading(false);
    }
  };

  const handleProfilePicture = (event) => {
    let file = event.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          setProfilePicture(uri);
          setProfilePictureChanged(true);
        },
        "base64"
      );
    }
  };
  const uploadToCloudinary = async () => {
    if (profilePictureChanged) {
      setLoading(true);
      try {
        const data = await new FormData();
        data.append("file", profilePicture);
        data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        const res = await axios({
          method: "POST",
          data,
          url: process.env.REACT_APP_UPLOAD_URL,
        });

        const reqBody = {
          profile_picture: res.data.secure_url,
        };

        // Upload url to my API
        const result = await updateProfilePictureEndpoint(reqBody);
        if (result.status === 200) {
          Swal.fire(
            "Success",
            "Profile Picture updated successfully!",
            "success"
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        Swal.fire("Error", errorHandler(error), "error");
      }
    }
  };
  const { first_name, last_name, middle_name, gender, dob, email } = profile;
  return (
    <Fragment>
      <h4>Profile Information</h4>
      {loading ? (
        "Loading"
      ) : (
        <div>
          <div className="d-flex flex-column align-items-center my-5">
            <input
              className="form-control d-none"
              ref={profilePictureRef}
              onChange={handleProfilePicture}
              name="photo"
              type="file"
              accept="image/*"
            />
            <img
              src={profilePicture ? profilePicture : DummyPhoto}
              className="rounded-circle"
              alt="Profile"
              height="200px"
              width="200px"
              onClick={() => profilePictureRef.current.click()}
            />
            <small>Click on image to change picture</small>
            {profilePictureChanged && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={uploadToCloudinary}
                type="button"
              >
                Upload Picture
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              placeholder="First Name"
              value={first_name}
              type="text"
              name="first_name"
              required="required"
              reference={register({ required: true })}
              errors={errors.first_name}
            />
            <TextInput
              placeholder="Last Name"
              value={last_name}
              type="text"
              name="last_name"
              required="required"
              reference={register({ required: true })}
              errors={errors.last_name}
            />
            <TextInput
              placeholder="Middle Name"
              type="text"
              value={middle_name}
              name="middle_name"
              reference={register}
              errors={errors.middle_name}
            />
            <TextInput
              placeholder="Email Address"
              type="email"
              value={email}
              required="required"
              name="email"
              reference={register({ required: true })}
              errors={errors.email}
            />
            <TextInput
              placeholder="Date of Birth"
              type="date"
              value={dob ? dob.substring(0, 10) : null}
              required="required"
              name="dob"
              reference={register({ required: true })}
              errors={errors.dob}
            />
            <SelectDropdown
              placeholder="Gender"
              name="gender"
              value={gender}
              reference={register({ required: true })}
              errors={errors.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </SelectDropdown>
            <button
              className="btn btn-md btn-secondary btn-block"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
