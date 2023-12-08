import { useEffect, useState } from "react";

import axios from "axios";

import Layout from "../../components/Layout";
import { Row } from "antd";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/medicos/getDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center pt-3">Agenda médica</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => {
            return (
              <div
                key={doctor._id}
                className="card p-2 m-3"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/doctor/book-appointment/${doctor._id}`)
                }
              >
                <div className="card-header">
                  Dr. {doctor.firstName} {doctor.lastName}
                  <div className="card-body">
                    <p>
                      <b>Especialização</b> {doctor.specialization}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </Row>
    </Layout>
  );
};

export default Home;
