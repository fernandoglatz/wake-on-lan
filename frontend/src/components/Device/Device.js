import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Device.css";
const EditDevice = () => {
  const [device, setDevice] = useState([]);
  const { id } = useParams();
  const getDeviceApi = "http://localhost:8080/wake-on-lan/device";

  useEffect(() => {
    getDevice();
  }, []);

  const getDevice = () => {
    axios
      .get(getDeviceApi.concat("/") + id)
      .then((item) => {
        setDevice(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="device mt-5">
      <table className="table table-bordered">
    <tbody>
      <tr>
        <td>Name</td>
        <td>{device.name}</td>
      </tr>
      <tr>
        <td>MAC</td>
        <td>{device.mac}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditDevice;
