import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import web from "../../src/images/register.svg";
import { signup } from "./../apis/core";
import axios from 'axios';



const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isFormDisabled, setFormDisabled] = useState(false);

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setFormDisabled(true);
    if (data.password !== data.confirm_password) {
      alert("Password and Confirm Password must be same!");
      setFormDisabled(false);
    } else {
      const _data = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      // sending POST request.
      axios.post("http://localhost:8000/signup", _data, { withCredentials: true })
        .then((response) => {
          setFormDisabled(false);
          if (response.data.isError) {
            alert(response.data.message);
          } else {
            alert("Account Created Successfully. Redirecting to Login.");
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          console.log("Done");
        });
      // const response = await signup(
      //   data.name,
      //   data.username,
      //   data.email,
      //   data.phone,
      //   data.password
      // );
      // setFormDisabled(false);
      // console.log("=>R", response);
      
      // if (response.isError) {
      //   alert(response.message);
      // } else {
      //   alert("Account Created Successfully. Redirecting to Login.");
      //   navigate('/login');
      // }
    }
  };

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Register</h1>
        <section id="header" className="d-flex align-items-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                <div className="container contact_div">
                  <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                      <form onSubmit={formSubmit}>
                        <div className="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="name"
                            value={data.name}
                            onChange={InputEvent}
                            placeholder="Enter your name"
                            disabled={isFormDisabled}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="username"
                            value={data.username}
                            onChange={InputEvent}
                            placeholder="Username"
                            disabled={isFormDisabled}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="phone"
                            value={data.phone}
                            onChange={InputEvent}
                            placeholder="Mobile No"
                            disabled={isFormDisabled}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="email"
                            value={data.email}
                            onChange={InputEvent}
                            placeholder="name@example.com"
                            disabled={isFormDisabled}
                          />
                          <div className="invalid-feedback">
                            Please provide a valid Email Address.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={InputEvent}
                            disabled={isFormDisabled}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={data.confirm_password}
                            onChange={InputEvent}
                            disabled={isFormDisabled}
                          />
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-outline-primary"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 header-img">
                <img
                  src={web}
                  className="img-fluid animated"
                  alt="Home Image"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
