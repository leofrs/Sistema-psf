import { Form, Input, message } from "antd";

import "../styles/Login-Register-Style.css";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/user/register",
        value
      );
      dispatch(hideLoading());
      if (res.status === 201) {
        message.success("Cadastro efetuado com sucesso");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Algo de errado aconteceu");
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
          <h3>Cadastro</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login">
            <p>Já tem uma conta? Faça o login</p>
          </Link>
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
