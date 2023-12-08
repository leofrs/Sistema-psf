import Layout from "../../components/Layout";

import { Form, Row, Col, Input, TimePicker } from "antd";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { showLoading, hideLoading } from "../../redux/features/alertSlice";

import { message } from "antd";

import { useNavigate } from "react-router-dom";

import moment from "moment";

const RegisterDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/medicos/register-doctor",
        {
          ...value,
          userId: user._id,
          timings: [
            moment(value.timings[0], "HH:mm").format("HH:mm"),
            moment(value.timings[1], "HH:mm").format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Cadastar medico</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Informações pessoais : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Nome"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Nome" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Sobrenome"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Sobrenome" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Telefone"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Contato" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="CFM"
              name="cfm"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="CFM" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Especificação do médico :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Especialização"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Espcialização" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Horário" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Cadastrar
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default RegisterDoctor;
