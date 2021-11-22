import React, { useState } from "react";
import web from "../../src/images/register.svg";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    wallet_id: "",
    password: "",
    confirm_password: "",
  });

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
    alert(`My email is ${data.email}, password is ${data.password}`);
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
                          />
                          <div className="invalid-feedback">
                            Please provide a valid Email Address.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Wallet ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="wallet_id"
                            value={data.wallet_id}
                            placeholder="Wallet ID"
                            aria-label="readonly input example"
                            readonly
                          />
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
                            value={data.password}
                            onChange={InputEvent}
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
                            value={data.confirm_password}
                            onChange={InputEvent}
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
