import React, { useState } from "react";

const LogIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
        <h1 className="text-center">Log In</h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form onSubmit={formSubmit}>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
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
                <label for="exampleInputPassword1" className="form-label">
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
              <div className="col-12">
                <button className="btn btn-outline-primary" type="submit">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
