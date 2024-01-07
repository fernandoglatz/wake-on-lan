import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Assuming the API is running on your local machine
  headers: {
    'Content-Type': 'application/json',
    // You can include other headers here like authorization headers if needed
  },
});

const CrudApiApp = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: '', mac: '' });
  const [editedDevice, setEditedDevice] = useState({ name: '', mac: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/wake-on-lan/device');
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await api.put('/wake-on-lan/device', newDevice);
      setDevices([...devices, response.data]);
      setNewDevice({ name: '', mac: '' });
    } catch (error) {
      console.error('Error creating device:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await api.post(`/wake-on-lan/device/${id}`, editedDevice);
      const updatedDevices = devices.map((device) =>
        device.id === id ? response.data : device
      );
      setDevices(updatedDevices);
      setEditedDevice({ name: '', mac: '' });
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/wake-on-lan/device/${id}`);
      const updatedDevices = devices.filter((device) => device.id !== id);
      setDevices(updatedDevices);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <div>
      <h1>Device CRUD</h1>
      <h2>Create Device</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <label>
          Name:
          <input
            type="text"
            value={newDevice.name}
            onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
          />
        </label>
        <label>
          MAC Address:
          <input
            type="text"
            value={newDevice.mac}
            onChange={(e) => setNewDevice({ ...newDevice, mac: e.target.value })}
          />
        </label>
        <button type="submit">Create</button>
      </form>

      <h2>Device List</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.mac}
            <button onClick={() => handleUpdate(device.id)}>Update</button>
            <button onClick={() => handleDelete(device.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudApiApp;
