import { Form, Input, message } from "antd";

import "../styles/Login-Register-Style.css";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/features/alertSlice";

const apiUrl = import.meta.env.VITE_REACT_APP_REGISTER;

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(apiUrl, value);
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
          <Form.Item label="Nome" name="name" rules={[{ required: true }]}>
            <Input type="text" required placeholder="Nome" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="text" required placeholder="Email" />
          </Form.Item>
          <Form.Item label="Senha" name="password" rules={[{ required: true }]}>
            <Input
              type="password"
              required
              minLength={6}
              pattern="^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$"
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item
            label="Confirmar Senha"
            name="confirmPassword" // Nome diferente para a confirmação da senha
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Por favor, confirme sua senha!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não coincidem"));
                },
              }),
            ]}
          >
            <Input type="password" required placeholder="Confirmar senha" />
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
