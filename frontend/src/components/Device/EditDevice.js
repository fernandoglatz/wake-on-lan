import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Device.css";
const EditDevice = () => {
  const [device, setDevice] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setDevice({ ...device, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getDeviceApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/show-device");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <div className="device-form">
      <div className="heading">
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
        <p>Device</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={device.name}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="mac" className="form-label">
            MAC
          </label>
          <input
            type="mac"
            className="form-control"
            id="mac"
            name="mac"
            value={device.mac}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};
export default EditDevice;
