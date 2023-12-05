import { useState, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

const Booking = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.data);
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
      <h1>Booking</h1>
      <div className="container m-3">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.fisrtName} {doctors.lastName}
            </h4>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Booking;
