import { Form, Input, message } from "antd";

import "../styles/Login-Register-Style.css";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        value
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login efetuado com sucesso");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Algo aconteceu de errado");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3>Login</h3>
          <Form.Item label="Email" name="email">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register">
            <p>Não tem uma conta? Cadastre-se</p>
          </Link>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
