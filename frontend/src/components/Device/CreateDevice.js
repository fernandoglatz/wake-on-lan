import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './Device.css';
const CreateDevice = () => {
    const navigate = useNavigate();
    const createDeviceApi = "http://localhost:8080/wake-on-lan/device";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [device, setDevice] = useState({
        name: "",
        mac: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setDevice({ ...device, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(device)
        try {
            setIsLoading(true);
            const response = await fetch(createDeviceApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setDevice({name: "",mac: ""})
                navigate('/show-device');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='device-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>Device</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={device.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="mac" className="form-label">MAC</label>
                    <input type="mac" className="form-control" id="mac" name="mac" value={device.mac} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateDevice