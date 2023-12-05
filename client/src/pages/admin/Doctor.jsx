import { useState, useEffect } from "react";

import axios from "axios";

import Layout from "../../components/Layout";
import { Table, message } from "antd";

import { showLoading, hideLoading } from "../../redux/features/alertSlice";

import { useDispatch } from "react-redux";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRes = async () => {
      await axios
        .get("http://localhost:8080/api/admin/getDoctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "aplication/json",
          },
        })
        .then((res) => {
          setDoctors(res.data.data);
        })
        .catch((error) => {
          console.log(`O erro encontrado foi ${error}`);
        });
    };
    getRes();
  }, []);

  const handleAccountApproved = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Consulta aprovada com sucesso");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Algo aconteceu de errado");
    }
  };

  const handleAccountRejected = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Consulta aprovada com sucesso");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Algo aconteceu de errado");
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName}, {record.lasName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Contato",
      dataIndex: "phone",
    },
    {
      title: "Aprovar ou Excluir",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <button
            className="btn btn-success "
            onClick={() => handleAccountApproved(record, "approved")}
          >
            Aprovar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleAccountRejected(record, "rejeitado")}
          >
            Rejeitar
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Consultas</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctor;
