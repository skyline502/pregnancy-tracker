import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { Modal, Alert, Toast } from "react-bootstrap";
import SignUpForm from "./SignUpForm";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  // const showSignUpForm = () => {
  //   dispatch(setCurrentModal(SignUpForm));
  // };

  return (
    <div>
      <form onSubmit={onLogin} className="container justify-content-center">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="btn btn-warning text-white m-1" type="submit">
          Login
        </button>
        <button
          className="btn btn-secondary text-white"
          onClick={handleShow}
        >
          Don't have an account? Sign up!
        </button>
      </form>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="form-group bg-info">
          <Modal.Title>
            <h4 className="text-light">New Mom</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForm;
